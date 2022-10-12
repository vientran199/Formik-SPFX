import * as React from 'react';
import styles from './HelloWorld.module.scss';
import { IHelloWorldProps } from './IHelloWorldProps';
import { escape } from '@microsoft/sp-lodash-subset';
import FormikComp from './FormikComp';
import  SignupForm  from './Formik';
import Basic from './SignUp';
import MyForm from './ValidateAsync';

export default class HelloWorld extends React.Component<IHelloWorldProps, {}> {
  public render(): React.ReactElement<IHelloWorldProps> {
    const {
      description,
      isDarkTheme,
      environmentMessage,
      hasTeamsContext,
      userDisplayName
    } = this.props;

    return (
      <section className={`${styles.helloWorld} ${hasTeamsContext ? styles.teams : ''}`}>
        <FormikComp/>

        <SignupForm/>

        <br/>
        <br/>
        <br/>
        <Basic/>
        <br/>
        <br/>
<MyForm/>
      </section>
    );
  }
}
