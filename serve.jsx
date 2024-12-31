import React from 'react';
import { createRoot } from 'react-dom/client';
import { css } from './src'

const App = () => {
  const [count, setCount] = React.useState(0)
  const _options = {
    breakpoints: {
      xs: 0,
      sm: 500,
      md: 700,
      lg: 900,
      xl: 1100,
    },
  }

  const cls = css({
    height: 200,
    background: {
      xs: "orange",
      sm: "red",
      md: "blue",
      lg: "green",
      xl: "yellow",
    },
    "& button": {
      "@media (max-width: 500px)": {
        "& ": {
          height: 100,
        }
      },
      color: {
        xs: "orange",
        sm: "red",
        md: "blue",
        lg: "green",
        xl: "yellow",
      },
      animationName: "fade",
      animationDuration: "3s",
      "@keyframes fade": {
        from: {
          opacity: 0
        },
        to: {
          opacity: 1
        }
      },
    },
    "@global": {
      body: {
        padding: 0,
        margin: 0
      }
    },
  }, _options)

  return (
    <div className={cls}>
      wellcome
      <button onClick={() => setCount(Math.random())}>up</button>
    </div>
  );
};


const rootEle = document.getElementById('root')
if (rootEle) {
  const root = createRoot(rootEle);
  root.render(<App />);
}
