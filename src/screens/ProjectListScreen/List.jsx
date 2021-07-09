import React from "react";
export const List = ({ users, list }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>name</th>
          <th>leader</th>
        </tr>
      </thead>
      <tbody>
        {list.map((project) => (
          <tr>
            <td>{project.name}</td>
            <td>{users.find((user) => 
            user.id === project.personId)?.name || 'unknown'}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
