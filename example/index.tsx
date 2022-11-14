import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { css } from '../src'


const App = () => {

  const className = css({
    // width: {
    //   xs: 100
    // },
    // height: {
    //   xs: 100,
    //   md: 200
    // },
    bgcolor: {
      md: "red",
      lg: "green"
    },
    bgimage: {}

    // backgroundColor: "green",
    // id: "myid"
  }, {
    classPrefix: "nax-",
    getProp: (key) => {
      if (key === "id") {
        return false
      }
      return true
    },
    breakpoints: {
      xs: 500,
      sm: 600,
      md: 800,
      lg: 990,
      xl: 1024
    }
  })

  return (
    <div className={className}>
      Nice
    </div>
  );
};


ReactDOM.render(<App />, document.getElementById('root'));
