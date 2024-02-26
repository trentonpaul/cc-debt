import "../styles/module.FancyInput.css";

interface FancyInputProps {
  id?: string;
  value: string;
  tag?: string;
  type?: string;
  onChangeHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

function FancyInput({ id, value, tag, type, onChangeHandler }: FancyInputProps) {
  return (
    <div className="tagged-input">
      {tag ? <span>{tag}</span> : ""}
      <input
        className={tag ? "" : "no-tag"}
        id={id}
        type={type}
        // step="0.01"
        value={value}
        onChange={(e) => {
          onChangeHandler(e);
        }}
      />
    </div>
  );
}

export default FancyInput;
