import React from "react";

export default function Mark({
  name,
  keyword,
}: {
  name: string;
  keyword: string;
}) {
  if (!keyword) {
    return <>{name}</>;
  }

  const nameSplit = name.split(new RegExp(`(${keyword})`, "gi"));

  return (
    <>
      {nameSplit.map((str, index) => {
        return (
          <span key={index}>
            {str === keyword ? (
              <span style={{ color: "#257AFD" }}>{keyword}</span>
            ) : (
              str
            )}
          </span>
        );
      })}
    </>
  );
}
