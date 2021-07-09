import { useEffect, useState } from "react";
import { List } from './List';
import { SearchPanel } from './SearchPanel';
import React from 'react'
const apiUrl = process.env.REACT_APP_API_URL
console.log("🚀 ~ file: index.jsx ~ line 6 ~ apiUrl", apiUrl)

export const ProjectListScreen = ()=>{
  const [param, setParam] = useState({ name: "", personId: "" });
  const [users, setUsers] = useState([]);
  const [list, setList] = useState([]);

  useEffect(() => {
    fetch(`${apiUrl}/projects`).then(async (response) => {
      if (response.ok) {
        setList(await response.json());
      }
    });
  }, [param]);


  useEffect(() => {
    fetch(`${apiUrl}/users`).then(async (response) => {
      if (response.ok) {
        setUsers(await response.json());
      }
    });
  }, []);
  return <div>
    <SearchPanel users={users} param={param} setParam={setParam}></SearchPanel>
    <List users={users} list={list}></List>
  </div>
}