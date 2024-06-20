const JsonViewer = ({ jsonData }) => {
  const renderJson = (data, indent = 0) => {
    if (typeof data === "object" && data !== null) {
      return Object.entries(data).map(([key, value]) => (
        <div style={{ marginLeft: indent * 10 }} key={key}>
          <strong>{key}:</strong> {renderJson(value, indent + 1)}
        </div>
      ));
    }
    return <span>{JSON.stringify(data)}</span>;
  };
  return (
    <div
      style={{
        fontFamily: "monospace",
        whiteSpace: "pre-wrap",
        wordWrap: "break-word",
      }}
    >
      {renderJson(jsonData)}
    </div>
  );
};

export default JsonViewer;
