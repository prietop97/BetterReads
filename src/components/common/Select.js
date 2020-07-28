import React from "react";

export default function Select({ placeholder, items }) {
  return (
    <select
      style={{ width: "100%", padding: "0.5rem 0", fontSize: "0.75rem" }}
      defaultValue={placeholder}
    >
      <option disabled>{placeholder}</option>
      {items.map(x => (
        <option value={x.id} key={x.id}>
          {x.option}
        </option>
      ))}
    </select>
  );
}
