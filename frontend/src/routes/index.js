import React from 'react';
import { Switch } from 'react-router-dom';

import SignIn from '../pages/SignIn';
import Students from '../pages/Students/Index';
import StudentForm from '../pages/Students/Form';
import Plans from '../pages/Plans/Index';
import PlanForm from '../pages/Plans/Form';
import HelpOrders from '../pages/HelpOrders';

import Route from './Route';

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={SignIn} />

      <Route path="/students/new" component={StudentForm} isPrivate />
      <Route path="/students/:id" component={StudentForm} isPrivate />
      <Route path="/students" component={Students} isPrivate />

      <Route path="/plans/new" component={PlanForm} isPrivate />
      <Route path="/plans/:id" component={PlanForm} isPrivate />
      <Route path="/plans" component={Plans} isPrivate />

      <Route path="/help-orders" component={HelpOrders} isPrivate />

      <Route path="/" component={() => <h1>404</h1>} />
    </Switch>
  );
}
