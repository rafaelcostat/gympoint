import React from 'react';
import { Switch } from 'react-router-dom';

import SignIn from '../pages/SignIn';
import Students from '../pages/Students/Index';
import StudentShow from '../pages/Students/Show';

import Route from './Route';

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={SignIn} />
      <Route path="/students" component={Students} isPrivate />
      <Route path="/students/:id" component={StudentShow} isPrivate />
      <Route path="/plans" component={Students} isPrivate />

      <Route path="/" component={() => <h1>404</h1>} />
    </Switch>
  );
}
