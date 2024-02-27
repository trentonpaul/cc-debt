import "../styles/module.FancyInput.css";

interface FancyInputProps {
  id?: string;
  value: string;
  tag?: string;
  type?: string;
  onChangeHandler: (str: string) => void;
}

function FancyInput({ id, value, tag, type, onChangeHandler }: FancyInputProps) {
  return (
    <div className="tagged-input">
      {tag ? <span>{tag}</span> : ""}
      {type == "number" ? (
        <input
          className={tag ? "" : "no-tag"}
          id={id}
          type={type}
          step="0.01"
          min="0"
          value={value}
          required
          autoComplete="off"
          onChange={(e) => {
            onChangeHandler(e.target.value);
          }}
          onBlur={() => {
            if (value) {
              const fixed = parseFloat(value).toFixed(2);
              onChangeHandler(fixed);
            }
          }}
        />
      ) : (
        <input
          className={tag ? "" : "no-tag"}
          id={id}
          type={type}
          value={value}
          required
          autoComplete="off"
          onChange={(e) => {
            onChangeHandler(e.target.value);
          }}
        />
      )}
    </div>
  );
}

export default FancyInput;
