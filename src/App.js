import React, { useState } from 'react';

function Button({ idValue, value, onClick, preventAnimation }) {

  function getRandomNumber(num) {
    return Math.floor(Math.random() * num);
  }

  function animateMove(event) {
    if (preventAnimation) return; // Prevent the animation if the details are correct

    const button = event.target;

    const windowHeight = window.innerHeight;
    const windowWidth = window.innerWidth;
    const buttonHeight = button.offsetHeight;
    const buttonWidth = button.offsetWidth;

    const targetTop = getRandomNumber(windowHeight - buttonHeight);
    const targetLeft = getRandomNumber(windowWidth - buttonWidth);

    let currentTop = parseInt(button.style.top) || 0;
    let currentLeft = parseInt(button.style.left) || 0;

    const step = 10; // Speed of the tween, adjust for faster/slower

    function tween() {
      // Calculate the next position for top and left using linear interpolation
      currentTop += (targetTop - currentTop) * 0.05;
      currentLeft += (targetLeft - currentLeft) * 0.05;

      button.style.top = `${currentTop}px`;
      button.style.left = `${currentLeft}px`;

      // Continue tweening if the button hasn't reached its target
      if (Math.abs(targetTop - currentTop) > 1 || Math.abs(targetLeft - currentLeft) > 1) {
        requestAnimationFrame(tween);
      }
    }

    requestAnimationFrame(tween); // Start the tween animation
  }

  return (
    <button
      onClick={onClick}
      onMouseEnter={animateMove}
      onMouseOver={animateMove}
      id={idValue}
      style={{ position: 'absolute', top: '500px', left: '650px', transition: 'top 0.2s, left 0.2s' }} // Start the button at (0, 0)
      className=""
    >
      {value}
    </button>
  );
}

function LoginForm() {
  const [studentNumber, setStudentNumber] = useState('');
  const [password, setPassword] = useState('');
  const [preventAnimation, setPreventAnimation] = useState(false);

  // Function to handle login and validation
  function handleLogin() {
    if (studentNumber === "220" && password === "food") {
      setPreventAnimation(true); // Disable the animation if details are correct
      alert("Login successful!"); // You can change this to whatever you want to do after login
    } else {
      setPreventAnimation(false); // Enable animation if details are incorrect
      alert("Incorrect details! Try again.");
    }
  }

  // Function to handle pressing "Enter"
  function handleKeyDown(event) {
    if (event.key === 'Enter') {
      handleLogin(); // Trigger login on "Enter" press
    }
  }

  return (
    <div className="container">
      <div className="login-box">
        <h2>Cafeteria Login</h2>
        <form>
          <div className="user-box">
            <input
              type="text"
              required=""
              value={studentNumber}
              onChange={(e) => setStudentNumber(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <label>Student Number</label>
          </div>
          <div className="user-box">
            <input
              type="password"
              required=""
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <label>Password</label>
          </div>
          <p class='prompt'>Login Prompt</p>
        </form>
      </div>
      <div className="button-box">
        <Button id="login-btn" value="Log In" onClick={handleLogin} preventAnimation={preventAnimation} />
      </div>
    </div>
  );
}

function App() {
  return <LoginForm />;
}

export default App;
