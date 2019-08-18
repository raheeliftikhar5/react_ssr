import React from 'react';
import classnames from 'classnames';

export default ({accessLevel}) => {
  return (
    <div className={classnames("home-page", {'admin': accessLevel === 'admin'})}>
      {accessLevel === 'admin' ? <h1>HELLO ADMIN</h1> : ''}
      {
        accessLevel === 'banned'
        ?
        <h1>You have been banned :(</h1>
        :
        <div className="time">
          <h1>{(new Date()).getHours()} : {(new Date()).getMinutes()} : {(new Date()).getSeconds()}</h1>
        </div>
      }
    </div>
  );
}