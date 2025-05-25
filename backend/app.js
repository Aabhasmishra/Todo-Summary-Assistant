require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { createClient } = require('@supabase/supabase-js');
const { IncomingWebhook } = require('@slack/webhook');
const { GoogleGenerativeAI } = require('@google/generative-ai');

// Initialize services
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);
const slackWebhook = new IncomingWebhook(process.env.SLACK_WEBHOOK_URL);
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const app = express();
app.use(cors());
app.use(express.json());

// Test route
app.get('/', (req, res) => {
  res.send('Todo Summary Assistant Backend is running!');
});

// Get all todos
app.get('/todos', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('todos')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    res.json(data);
  } catch (err) {
    console.error('GET /todos error:', err);
    res.status(500).json({ error: 'Failed to fetch todos' });
  }
});

// Add new todo
app.post('/todos', async (req, res) => {
  try {
    const { task } = req.body;
    if (!task || typeof task !== 'string') {
      return res.status(400).json({ error: 'Invalid task' });
    }

    const { data, error } = await supabase
      .from('todos')
      .insert([{ task, completed: false }])
      .select();
    
    if (error) throw error;
    res.status(201).json(data[0]);
  } catch (err) {
    console.error('POST /todos error:', err);
    res.status(500).json({ error: 'Failed to add todo' });
  }
});

// Edit todo text
app.put('/todos/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { task } = req.body;
    
    const { data, error } = await supabase
      .from('todos')
      .update({ task })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    res.json(data);
    
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Updated the "completed" column
app.put('/todos/:id/toggle', async (req, res) => {
  try {
    const { id } = req.params;
    
    // 1. First get current status
    const { data: currentTodo, error: fetchError } = await supabase
      .from('todos')
      .select('completed')
      .eq('id', id)
      .single();

    if (fetchError) throw fetchError;

    // 2. Update to opposite status
    const { data, error: updateError } = await supabase
      .from('todos')
      .update({ completed: !currentTodo.completed })
      .eq('id', id)
      .select()
      .single();

    if (updateError) throw updateError;
    
    res.status(200).json({ 
      success: true,
      completed: data.completed 
    });
    
  } catch (err) {
    console.error('Toggle error:', err);  // This will show in your backend logs
    res.status(500).json({ 
      error: err.message,
      details: err  // Send full error details for debugging
    });
  }
});

// Delete todo
app.delete('/todos/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { error } = await supabase
      .from('todos')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
    res.status(204).end();
  } catch (err) {
    console.error('DELETE /todos error:', err);
    res.status(500).json({ error: 'Failed to delete todo' });
  }
});

// Generate summary (without sending to Slack)
app.post('/summarize', async (req, res) => {
  try {
    // 1. Get pending todos
    const { data: todos, error } = await supabase
      .from('todos')
      .select('*')
      .eq('completed', false);
    
    if (error) throw error;
    if (!todos.length) {
      return res.status(200).json({ 
        success: true,
        summary: "No pending tasks to summarize!",
        hasTodos: false
      });
    }

    // 2. Format prompt for Gemini
    const todoList = todos.map(t => `- ${t.task}`).join('\n');
    const prompt = `Summarize these pending tasks in a concise, motivational way and give tip related to the topics in one paragraph:\n${todoList}`;

    // 3. Call Gemini API
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent(prompt);
    const summary = (await result.response).text();

    res.json({ 
      success: true,
      summary,
      hasTodos: true
    });

  } catch (err) {
    console.error('POST /summarize error:', err);
    res.status(500).json({ 
      error: 'Failed to generate summary',
      details: err.message
    });
  }
});

// Send existing summary to Slack
app.post('/send-to-slack', async (req, res) => {
  try {
    const { summary } = req.body;
    
    if (!summary || typeof summary !== 'string') {
      return res.status(400).json({ error: 'Invalid summary format' });
    }

    await slackWebhook.send({
      text: `*Todo Summary*\n${summary}`,
      mrkdwn: true
    });

    res.json({ success: true });

  } catch (err) {
    console.error('POST /send-to-slack error:', err);
    res.status(500).json({ 
      error: 'Failed to send to Slack',
      details: err.message
    });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Server error:', err);
  res.status(500).json({ error: 'Internal server error' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Supabase connected to: ${process.env.SUPABASE_URL}`);
});