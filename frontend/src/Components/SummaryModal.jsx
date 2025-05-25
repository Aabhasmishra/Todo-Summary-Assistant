function SummaryModal({ summary, sendToSlack, slackMessage, closeModal }) {
  return (
    <>
      <div
        onClick={closeModal}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: "rgba(0,0,0,0.5)",
          zIndex: 999,
        }}
      />
      <div
        style={{
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          backgroundColor: "white",
          padding: "16px",
          paddingTop: "0px",
          borderRadius: "8px",
          boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
          zIndex: 1000,
          width: "80%",
          maxWidth: "500px",
        }}
      >
        <h2 style={{ textAlign: "center", color: "black", margin: "1rem"}}>
          AI Generated Summary
        </h2>
        <p
          style={{
            margin: "15px 0",
            whiteSpace: "pre-line",
            backgroundColor: "#c9c9c9",
            padding: "10px",
            borderRadius: "4px",
          }}
        >
          {summary}
        </p>
        {slackMessage && (
          <p
            style={{
              color: slackMessage.includes("✅") ? "#4CAF50" : "#f44336",
              fontWeight: "bold",
            }}
          >
            {slackMessage}
          </p>
        )}
        <div style={{ display: "flex", gap: "10px" }}>
          <button
            onClick={sendToSlack}
            style={{
              padding: "8px 16px",
              backgroundColor: "#4CAF50",
              color: "white",
              border: "none",
              borderRadius: "4px",
            }}
          >
            Send to Slack
          </button>
          <button
            onClick={closeModal}
            style={{
              padding: "8px 16px",
              backgroundColor: "#f44336",
              color: "white",
              border: "none",
              borderRadius: "4px",
            }}
          >
            Close
          </button>
        </div>
      </div>
    </>
  );
}
export default SummaryModal;