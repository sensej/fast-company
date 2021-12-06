// import { logDOM } from '@testing-library/react';
import React, { useState } from 'react';
import api from '../api';

export const Users = () => {
  const [users, setUsers] = useState(api.users.fetchAll());

  const handleDeleteUser = (event) => {
    const USER_ID = event.target.closest('tr').id;

    setUsers(() => {
      return users.filter((user) => {
        return user._id !== USER_ID;
      });
    });
  };

  const getHeaderClasses = () => {
    let headerClasses = 'd-inline m-2 p-2 text-white rounded-3 ';
    headerClasses += users.length === 0 ? 'bg-danger' : 'bg-primary';

    return headerClasses;
  };

  const renderTable = () => {
    return (
      <>
        <table className="table mt-4">
          <thead>
            <tr>
              <th scope="col">Имя</th>
              <th scope="col">Качества</th>
              <th scope="col">Профессия</th>
              <th scope="col">Встретился, раз</th>
              <th scope="col">Оценка</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => {
              return (
                <tr key={user._id} id={user._id}>
                  <th scope="row">{user.name}</th>
                  <td>
                    {user.qualities.map((quality) => {
                      return (
                        <span
                          key={quality._id}
                          className={'badge me-2 bg-' + quality.color}
                        >
                          {quality.name}
                        </span>
                      );
                    })}
                  </td>
                  <td>{user.profession.name}</td>
                  <td>{user.completedMeetings}</td>
                  <td>{user.rate}/5</td>
                  <td>
                    <button
                      className="btn btn-danger"
                      onClick={handleDeleteUser}
                    >
                      Удалить
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </>
    );
  };

  return (
    <>
      <h3 className={getHeaderClasses()}>
        {users.length === 0
          ? 'Никто с тобой не тусанет'
          : users.length + ' человек тусанет с тобой сегодня'}
      </h3>
      {renderTable()}
    </>
  );
};
