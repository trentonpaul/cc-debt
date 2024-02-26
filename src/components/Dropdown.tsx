import { GoTriangleDown } from "react-icons/go";
import "../styles/module.Dropdown.css";
import { useState } from "react";

interface DropdownProps {
  options: string[];
  selected: number;
  setSelected: (idx: number) => void;
}

function Dropdown({ options, selected, setSelected }: DropdownProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className="dropdown-wrapper">
      <div
        className={"dropdown-btn" + (open ? " open" : "")}
        onClick={() => {
          setOpen(!open);
        }}
      >
        <span id="selected-item">{options[selected]}</span>
        <span>
          <GoTriangleDown />
        </span>
      </div>
      <div className={"dropdown-menu" + (open ? " open" : "")}>
        {options.map((option: string, idx: number) => {
          return (
            <div
              key={idx}
              className={"item" + (idx == selected ? " active" : "")}
              onClick={() => {
                setOpen(false);
                setSelected(idx);
              }}
            >
              {option}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Dropdown;
