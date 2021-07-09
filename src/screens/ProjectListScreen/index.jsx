import { useEffect, useState } from "react";
import { List } from './List';
import { SearchPanel } from './SearchPanel';
import React from 'react'
import { cleanObject, useDebounce, useMount } from 'utils';
import * as qs from 'qs';
const apiUrl = process.env.REACT_APP_API_URL

export const ProjectListScreen = ()=>{
  const [param, setParam] = useState({ name: "", personId: "" });
  const [users, setUsers] = useState([]);
  const [list, setList] = useState([]);

  const debouncedParam = useDebounce(param, 3000)
  useEffect(() => {
    fetch(`${apiUrl}/projects/?${qs.stringify(cleanObject(param))}`).then(async (response) => {
      if (response.ok) {
        setList(await response.json());
      }
    });
  }, [debouncedParam]);

  useMount(() => {
    fetch(`${apiUrl}/users`).then(async (response) => {
      if (response.ok) {
        setUsers(await response.json());
      }
    });
  })
  return <div>
    <SearchPanel users={users} param={param} setParam={setParam}></SearchPanel>
    <List users={users} list={list}></List>
  </div>
}