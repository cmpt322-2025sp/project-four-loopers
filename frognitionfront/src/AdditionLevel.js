import React, { useState, useEffect } from 'react';
import flyImage from './Moth.png'; 
import frogImage from './Euler.png';


function AdditionLevel() {
  const [problem, setProblem] = useState(null);  // Stores problem data
  const [flies, setFlies] = useState([]);  // Stores flies
  const [correctAnswer, setCorrectAnswer] = useState(null);  // Stores correct answer
  const [selectedAnswer, setSelectedAnswer] = useState(null);  // Stores player's choice
  const [feedback, setFeedback] = useState('');  // Stores feedback message

  useEffect(() => {
    fetchProblem(); // Fetch the first problem when the page loads
  }, []);

  const fetchProblem = () => {
    fetch('http://127.0.0.1:8000/get_random_problem/') // Fetch from Django backend
      .then((response) => response.json())
      .then((data) => {
        console.log('Fetched new problem:', data);

        // Update state with the fetched problem data
        setProblem({ num1: data.num1, num2: data.num2 });  // Store problem
        setFlies(data.flies);  // Store flies
        setCorrectAnswer(data.correct_answer);  // Store correct answer
        setSelectedAnswer(null);  // Reset selection
        setFeedback('');  // Reset feedback message
      })
      .catch((error) => console.error('Error fetching new problem:', error));
  };

  const handleFlyClick = (flyNumber) => {
    setSelectedAnswer(flyNumber);
    if (flyNumber === correctAnswer) {
      setFeedback('✅ Correct! Great job!');
    } else {
      setFeedback('❌ Incorrect. Try again!');
    }
  };
  return (
<div style={{width: 1440, height: 1024, position: 'relative', background: '#BA826B'}}>
    <div style={{width: 1508, height: 1026.50, left: -23, top: -4, position: 'absolute'}}>
        <div style={{width: 1492, height: 748, left: 16, top: 0, position: 'absolute', background: 'linear-gradient(180deg, #4FC5E5 0%, #D2FFFB 64%, #D2FFFB 99%)', boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)'}} />
        <div data-svg-wrapper style={{left: 741, top: 183, position: 'absolute'}}>
        <svg width="427" height="109" viewBox="0 0 427 109" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M423.5 108.897L112.5 104.897H0C0 104.897 40 68.8967 78.5 76.3966C117 83.8965 153.5 72.3966 153.5 72.3966C153.5 72.3966 112.5 42.3966 182 6.89663C251.5 -28.6033 249.5 85.3966 270.5 67.3966C291.5 49.3966 276 20.8965 333.5 30.8965C391 40.8965 336 87.8967 389.5 93.3966C443 98.8965 423.5 108.897 423.5 108.897Z" fill="#ECFBFC"/>
        </svg>
        </div>
        <div data-svg-wrapper style={{left: 16, top: 669, position: 'absolute'}}>
        <svg width="58" height="121" viewBox="0 0 58 121" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M58 121H-2.22059H-7V58.8413L-2.22059 47.0815C-2.22059 47.0815 -3.17647 1.72243 5.42647 0.0424697C14.0294 -1.6375 24.5441 47.0815 24.5441 47.0815C24.5441 47.0815 34.1029 21.882 42.7059 26.9219C51.3088 31.9618 58 58.8413 58 58.8413V121Z" fill="url(#paint0_linear_53_61)"/>
        <defs>
        <linearGradient id="paint0_linear_53_61" x1="25.5" y1="0" x2="25.5" y2="121" gradientUnits="userSpaceOnUse">
        <stop offset="0.25" stop-color="#8F9631"/>
        <stop offset="1" stop-color="#2E3010"/>
        </linearGradient>
        </defs>
        </svg>
        </div>
        <div data-svg-wrapper style={{left: 0, top: 714, position: 'absolute'}}>
        <svg width="74" height="131" viewBox="0 0 74 131" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M-12.8099 4.93132C-15.7214 0.143958 -23 11.3145 -23 11.3145V131H71.6224V33.6558C71.6224 33.6558 80.3568 12.9104 64.3438 1.73971C48.3307 -9.43093 55.6094 36.8474 55.6094 36.8474C55.6094 36.8474 49.7865 28.8684 38.1406 33.6558C26.4948 38.4433 38.1406 49.6139 38.1406 49.6139L22.1276 59.1887C22.1276 59.1887 32.3177 33.6558 11.9375 33.6558C-8.44271 33.6558 3.20313 44.8265 3.20313 44.8265H-12.8099C-12.8099 44.8265 -5.53125 40.039 -6.98698 24.081C-8.44271 8.12299 -9.89844 9.71869 -12.8099 4.93132Z" fill="url(#paint0_linear_53_59)"/>
        <defs>
        <linearGradient id="paint0_linear_53_59" x1="25.5" y1="0" x2="25.5" y2="131" gradientUnits="userSpaceOnUse">
        <stop offset="0.725" stop-color="#7E8C2A"/>
        <stop offset="1" stop-color="#22260B" stop-opacity="0.81"/>
        </linearGradient>
        </defs>
        </svg>
        </div>
        <div data-svg-wrapper style={{left: 1399, top: 233, position: 'absolute'}}>
        <svg width="68" height="511" viewBox="0 0 68 511" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g filter="url(#filter0_f_52_44)">
        <path d="M23.5368 104L65.979 4L68 507H4V467.5V208.5H51.1579V104H23.5368Z" fill="#33C0E9"/>
        </g>
        <defs>
        <filter id="filter0_f_52_44" x="0" y="0" width="72" height="511" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
        <feFlood flood-opacity="0" result="BackgroundImageFix"/>
        <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
        <feGaussianBlur stdDeviation="2" result="effect1_foregroundBlur_52_44"/>
        </filter>
        </defs>
        </svg>
        </div>
        <div data-svg-wrapper style={{left: 1216, top: 196, position: 'absolute'}}>
        <svg width="211" height="56" viewBox="0 0 211 56" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M210.008 54.6086C210.008 54.6086 -1.49206 58.1086 0.00794117 50.6086C1.50794 43.1086 39.5079 39.1086 39.5079 39.1086C39.5079 39.1086 45.0079 -2.39142 95.0079 0.10858C145.008 2.60858 124.008 42.6086 140.508 39.1086C157.008 35.6086 151.008 25.1086 182.008 30.1086C213.008 35.1086 210.008 54.6086 210.008 54.6086Z" fill="#ECFBFC"/>
        </svg>
        </div>
        <div data-svg-wrapper style={{left: 825, top: 613, position: 'absolute'}}>
        <svg width="103" height="135" viewBox="0 0 103 135" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g filter="url(#filter0_f_52_42)">
        <path d="M59.6354 24.5668H4V131H99V4H63.8343L49.1381 18.9109H59.6354V24.5668Z" fill="#95DDE2"/>
        </g>
        <defs>
        <filter id="filter0_f_52_42" x="0" y="0" width="103" height="135" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
        <feFlood flood-opacity="0" result="BackgroundImageFix"/>
        <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
        <feGaussianBlur stdDeviation="2" result="effect1_foregroundBlur_52_42"/>
        </filter>
        </defs>
        </svg>
        </div>
        <div data-svg-wrapper style={{left: 1040.50, top: 352.50, position: 'absolute'}}>
        <svg width="165" height="164" viewBox="0 0 165 164" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g filter="url(#filter0_f_52_40)">
        <path d="M4.5 43.5L26 4.5H160.5L157 152.5L141.5 159.5L128 139.5H22.5L26 43.5H4.5Z" fill="#73CDDF"/>
        </g>
        <defs>
        <filter id="filter0_f_52_40" x="0.5" y="0.5" width="164" height="163" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
        <feFlood flood-opacity="0" result="BackgroundImageFix"/>
        <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
        <feGaussianBlur stdDeviation="2" result="effect1_foregroundBlur_52_40"/>
        </filter>
        </defs>
        </svg>
        </div>
        <div data-svg-wrapper style={{left: 23, top: 738, position: 'absolute'}}>
        <svg width="810" height="172" viewBox="0 0 810 172" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g filter="url(#filter0_d_34_42)">
        <path d="M0 164H741.138L806 0H692.868V107.517H0V164Z" fill="#FCDED1"/>
        </g>
        <defs>
        <filter id="filter0_d_34_42" x="-4" y="0" width="814" height="172" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
        <feFlood flood-opacity="0" result="BackgroundImageFix"/>
        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
        <feOffset dy="4"/>
        <feGaussianBlur stdDeviation="2"/>
        <feComposite in2="hardAlpha" operator="out"/>
        <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.3 0"/>
        <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_34_42"/>
        <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_34_42" result="shape"/>
        </filter>
        </defs>
        </svg>
        </div>
        <div data-svg-wrapper style={{left: 933, top: 738, position: 'absolute'}}>
        <svg width="534" height="178" viewBox="0 0 534 178" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g filter="url(#filter0_d_34_56)">
        <path d="M4 0V139.911H182.463V170H535V0H4Z" fill="#FCDED1"/>
        </g>
        <defs>
        <filter id="filter0_d_34_56" x="0" y="0" width="539" height="178" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
        <feFlood flood-opacity="0" result="BackgroundImageFix"/>
        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
        <feOffset dy="4"/>
        <feGaussianBlur stdDeviation="2"/>
        <feComposite in2="hardAlpha" operator="out"/>
        <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
        <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_34_56"/>
        <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_34_56" result="shape"/>
        </filter>
        </defs>
        </svg>
        </div>
        <div data-svg-wrapper style={{left: 1422, top: 690, position: 'absolute'}}>
        <svg width="41" height="102" viewBox="0 0 41 102" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M65 102H4.77941H0V49.6017L4.77941 39.6885C4.77941 39.6885 3.82353 1.45197 12.4265 0.0358009C21.0294 -1.38037 31.5441 39.6885 31.5441 39.6885C31.5441 39.6885 41.1029 18.446 49.7059 22.6945C58.3088 26.943 65 49.6017 65 49.6017V102Z" fill="url(#paint0_linear_52_49)"/>
        <defs>
        <linearGradient id="paint0_linear_52_49" x1="32.5" y1="0" x2="32.5" y2="102" gradientUnits="userSpaceOnUse">
        <stop offset="0.25" stop-color="#8F9631"/>
        <stop offset="1" stop-color="#2E3010"/>
        </linearGradient>
        </defs>
        </svg>
        </div>
        <div data-svg-wrapper style={{left: 1393, top: 743, position: 'absolute'}}>
        <svg width="70" height="81" viewBox="0 0 70 81" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M7.56379 3.04914C5.40271 0.089012 0 6.99602 0 6.99602V81H70.2352V20.8101C70.2352 20.8101 76.7184 7.98274 64.8325 1.0757C52.9465 -5.83134 58.3492 22.7835 58.3492 22.7835C58.3492 22.7835 54.0271 17.8499 45.3827 20.8101C36.7384 23.7703 45.3827 30.6773 45.3827 30.6773L33.4968 36.5976C33.4968 36.5976 41.0606 20.8101 25.933 20.8101C10.8054 20.8101 19.4497 27.7171 19.4497 27.7171H7.56379C7.56379 27.7171 12.9665 24.7569 11.886 14.8898C10.8054 5.02261 9.72487 6.00927 7.56379 3.04914Z" fill="url(#paint0_linear_52_50)"/>
        <defs>
        <linearGradient id="paint0_linear_52_50" x1="36" y1="0" x2="36" y2="81" gradientUnits="userSpaceOnUse">
        <stop offset="0.725" stop-color="#7E8C2A"/>
        <stop offset="1" stop-color="#22260B" stop-opacity="0.81"/>
        </linearGradient>
        </defs>
        </svg>
        </div>
        <div data-svg-wrapper style={{left: 214, top: 74, position: 'absolute'}}>
        <svg width="304" height="95" viewBox="0 0 304 95" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g filter="url(#filter0_f_52_41)">
        <path d="M152 4L299.224 90.25H4.77568L152 4Z" fill="#30BFEA"/>
        </g>
        <defs>
        <filter id="filter0_f_52_41" x="0.775696" y="0" width="302.449" height="94.25" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
        <feFlood flood-opacity="0" result="BackgroundImageFix"/>
        <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
        <feGaussianBlur stdDeviation="2" result="effect1_foregroundBlur_52_41"/>
        </filter>
        </defs>
        </svg>
        </div>
        <div data-svg-wrapper style={{left: 465, top: 44, position: 'absolute'}}>
        <svg width="335" height="62" viewBox="0 0 335 62" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M335 62H0C0 62 16.9534 59.5255 21.7004 46.534C26.4474 33.5426 30.5162 33.5426 42.7227 36.6358C54.9291 39.729 48.1478 47.7713 61.7105 42.2035C75.2733 36.6358 90.1923 3.22926 112.571 0.136063C134.949 -2.95713 132.915 47.7713 160.719 42.2035C188.522 36.6358 204.119 10.6529 233.957 19.9325C263.796 29.2121 244.808 55.195 270.577 42.2035C296.346 29.2121 303.128 38.4917 316.69 42.2035C330.253 45.9154 335 62 335 62Z" fill="#ECFBFC"/>
        </svg>
        </div>
        <div data-svg-wrapper style={{left: 800, top: 390, position: 'absolute'}}>
        <svg width="180" height="40" viewBox="0 0 180 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M180 40H0C0 40 15.0628 17.8393 27.113 19.8539C39.1632 21.8686 38.41 35.2992 56.4854 32.6131C74.5607 29.927 59.4979 5.75169 71.5481 0.379403C83.5983 -4.99288 85.1046 48.73 96.4017 32.6131C107.699 16.4963 131.799 13.8101 133.305 19.8539C134.812 25.8978 138.577 45.3723 141.59 32.6131C144.603 19.8539 161.925 36.6423 169.456 32.6131C176.987 28.5839 180 40 180 40Z" fill="white"/>
        </svg>
        </div>
        <div style={{width: 20, height: 37, left: 963, top: 748, position: 'absolute', background: '#E06A2D'}} />
        <div style={{width: 14, height: 28, left: 966, top: 753, position: 'absolute', background: 'linear-gradient(180deg, #9D1F13 29%, rgba(55, 10.86, 6.66, 0.71) 100%)'}} />
        <div data-svg-wrapper style={{left: 719, top: 449, position: 'absolute'}}>
        <svg width="104" height="99" viewBox="0 0 104 99" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g filter="url(#filter0_f_52_43)">
        <path d="M73.1399 43.7533V94.5L4 40V4H73.1399L100 43.7533H73.1399Z" fill="#95DDE2"/>
        </g>
        <defs>
        <filter id="filter0_f_52_43" x="0" y="0" width="104" height="98.5" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
        <feFlood flood-opacity="0" result="BackgroundImageFix"/>
        <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
        <feGaussianBlur stdDeviation="2" result="effect1_foregroundBlur_52_43"/>
        </filter>
        </defs>
        </svg>
        </div>
        <div data-svg-wrapper style={{left: 512.50, top: 773.50, position: 'absolute'}}>
        <svg width="558" height="178" viewBox="0 0 558 178" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M328 169.5C305.5 164 315 43 315 43C315 43 294.5 130.5 289 147C283.5 163.5 0.5 177 0.5 177C0.5 177 350.5 175 328 169.5Z" fill="#A46953"/>
        <path d="M384.5 109.5V0.5C384.5 0.5 387.5 45 392 51.5C396.5 58 384.5 109.5 384.5 109.5Z" fill="#A46953"/>
        <path d="M557 156.5C476.071 154.831 441.076 153.739 398 151.5C387.614 148.709 383.156 146.946 398 140.5C418.564 149.87 474.734 147.3 474.5 144C474.266 140.7 557 156.5 557 156.5Z" fill="#A46953"/>
        <path d="M328 169.5C305.5 164 315 43 315 43C315 43 294.5 130.5 289 147C283.5 163.5 0.5 177 0.5 177C0.5 177 350.5 175 328 169.5Z" stroke="#A46953"/>
        <path d="M384.5 109.5V0.5C384.5 0.5 387.5 45 392 51.5C396.5 58 384.5 109.5 384.5 109.5Z" stroke="#A46953"/>
        <path d="M557 156.5C476.071 154.831 441.076 153.739 398 151.5C387.614 148.709 383.156 146.946 398 140.5C418.564 149.87 474.734 147.3 474.5 144C474.266 140.7 557 156.5 557 156.5Z" stroke="#A46953"/>
        </svg>
        </div>
        <div data-svg-wrapper style={{left: 926, top: 983.46, position: 'absolute'}}>
        <svg width="511" height="30" viewBox="0 0 511 30" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M68.5 9.00003C56.5 17.5 1 29.5 1 29.5L510 1.50003C510 1.50003 80.5 0.500026 68.5 9.00003Z" fill="#A46953" stroke="#A46953"/>
        </svg>
        </div>
        <div data-svg-wrapper style={{left: 23, top: 982.56, position: 'absolute'}}>
        <svg width="589" height="45" viewBox="0 0 589 45" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M510.5 11.0008C536 -12.4992 83 11.0008 83 11.0008H0V44.5009H588.5C588.5 44.5009 485 34.5008 510.5 11.0008Z" fill="#A46953" stroke="#A46953"/>
        </svg>
        </div>
        <div data-svg-wrapper style={{left: 1182.50, top: 939.31, position: 'absolute'}}>
        <svg width="192" height="17" viewBox="0 0 192 17" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M46 13.5C86.5 11.4999 140 4.50006 179.5 13.5C219 22.4999 144.5 -0.999943 115.5 1.5C86.5 3.99994 1.5 1.5 1.5 1.5C1.5 1.5 5.5 15.5001 46 13.5Z" fill="#A46953" stroke="#A46953"/>
        </svg>
        </div>
    </div>
    <div style={{width: 172.50, height: 174, left: 1247.50, top: 18, position: 'absolute'}}>
        <div data-svg-wrapper style={{left: 0, top: 14, position: 'absolute'}}>
        <svg width="161" height="160" viewBox="0 0 161 160" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M155.5 80C155.5 121.421 121.921 155 80.5 155C39.0786 155 5.5 121.421 5.5 80C5.5 38.5786 39.0786 5 80.5 5C121.921 5 155.5 38.5786 155.5 80Z" stroke="black" stroke-width="10"/>
        </svg>
        </div>
        <div data-svg-wrapper style={{left: 127.50, top: 0, position: 'absolute'}}>
        <svg width="46" height="45" viewBox="0 0 46 45" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M15.8065 23.76L1 36.08L9.1 44L23.2532 32.12L15.8065 23.76Z" fill="black"/>
        <path d="M29.4343 39.0591C30.1433 39.855 31.3519 39.9551 32.1821 39.2866L44.359 29.4814C45.2511 28.763 45.3588 27.4435 44.595 26.5899L22.1498 1.50831C21.4069 0.678232 20.1291 0.615009 19.3079 1.36772L7.85343 11.8677C7.04739 12.6066 6.98415 13.8558 7.71145 14.6723L15.8065 23.76L23.2532 32.12L29.4343 39.0591Z" fill="black"/>
        <path d="M15.8065 23.76L7.71145 14.6723C6.98415 13.8558 7.04739 12.6066 7.85343 11.8677L19.3079 1.36772C20.1291 0.615009 21.4069 0.678232 22.1498 1.50831L44.595 26.5899C45.3588 27.4435 45.2511 28.763 44.359 29.4814L32.1821 39.2866C31.3519 39.9551 30.1433 39.855 29.4343 39.0591L23.2532 32.12M15.8065 23.76L1 36.08L9.1 44L23.2532 32.12M15.8065 23.76L23.2532 32.12" stroke="black"/>
        </svg>
        </div>
        <div style={{width: 63, height: 57, left: 48.50, top: 37, position: 'absolute', color: 'black', fontSize: 60, fontFamily: 'Inika', fontWeight: '400', wordWrap: 'break-word'}}>59 </div>
        <div style={{width: 86, height: 12, left: 45.50, top: 112, position: 'absolute', color: 'black', fontSize: 15, fontFamily: 'Inika', fontWeight: '400', wordWrap: 'break-word'}}>SECONDS</div>
    </div>
    <div style={{width: 109, height: 247, left: 697, top: 487, position: 'absolute'}}>
        <div style={{width: 109, height: 166, left: 0, top: 81, position: 'absolute', background: '#F9E0B5', boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)', border: '6px #E37806 solid'}} />
        <div data-svg-wrapper style={{left: 3, top: 0, position: 'absolute'}}>
        <svg width="114" height="91" viewBox="0 0 114 91" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M3 7V88H105L3 7Z" fill="#F9E0B5" stroke="#E37806" stroke-width="6"/>
        </svg>
        </div>
        <div style={{width: 5.94, height: 185.22, left: 1, top: 87.84, position: 'absolute', transform: 'rotate(-33deg)', transformOrigin: 'top left', background: '#E37806'}} />
    </div>
    <div style={{width: 191, height: 230, left: 887, top: 506, position: 'absolute'}}>
        <div style={{width: 130, height: 104.37, left: 9, top: 125.63, position: 'absolute', background: '#FFD3C6', border: '5px #E57613 solid'}} />
        <div style={{width: 121, height: 56.75, left: 9, top: 69.89, position: 'absolute', background: '#FFD3C6', border: '5px #E57613 solid'}} />
        <div data-svg-wrapper style={{left: 9, top: 0, position: 'absolute'}}>
        <svg width="128" height="71" viewBox="0 0 128 71" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M6.81903 68.18C31.3748 47.1561 45.0193 32.0184 63.506 4.701C80.7907 33.903 94.9643 48.5652 119.992 68.18H6.81903Z" fill="#FFD3C6" stroke="#E57613" stroke-width="5"/>
        </svg>
        </div>
        <div data-svg-wrapper style={{left: 136, top: 0, position: 'absolute'}}>
        <svg width="64" height="78" viewBox="0 0 64 78" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M1.90735e-05 0V9.90225C18.7835 39.5924 32.1603 56.9055 62.9846 78C62.9846 78 64.0001 70.5212 64 70C63.9999 69.4788 22.1705 39.3408 1.90735e-05 0Z" fill="#FEC441"/>
        </svg>
        </div>
        <div style={{width: 23, height: 23, left: 19, top: 159, position: 'absolute', background: '#822C0C', borderRadius: 9999, border: '4px #D9731B solid'}} />
        <div style={{width: 20, height: 0, left: 29, top: 160, position: 'absolute', transform: 'rotate(90deg)', transformOrigin: 'top left', border: '3px #D9731B solid'}}></div>
        <div style={{width: 18, height: 0, left: 22, top: 172, position: 'absolute', border: '3px #D9731B solid'}}></div>
        <div data-svg-wrapper style={{left: 0, top: 206, position: 'absolute'}}>
        <svg width="73" height="24" viewBox="0 0 73 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M73 24H0C0 24 1.02098 12.5122 3.57343 11.5133C6.12587 10.5144 9.18881 8.01702 11.7413 10.0149C14.2937 12.0128 12.7622 6.51862 21.951 6.51862C31.1399 6.51862 24.5035 0.525012 31.1399 0.0255382C37.7762 -0.473936 42.3706 6.51862 45.9441 6.51862C49.5175 6.51862 49.007 5.51968 58.1958 4.02128C67.3846 2.52289 73 6.51862 73 6.51862V24Z" fill="url(#paint0_linear_51_30)"/>
        <defs>
        <linearGradient id="paint0_linear_51_30" x1="36.5" y1="0" x2="36.5" y2="24" gradientUnits="userSpaceOnUse">
        <stop offset="0.65" stop-color="#A5A432"/>
        <stop offset="1" stop-color="#547822"/>
        </linearGradient>
        </defs>
        </svg>
        </div>
        <div data-svg-wrapper style={{left: 72, top: 0, position: 'absolute'}}>
        <svg width="119" height="70" viewBox="0 0 119 70" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M0 0H57L119 70H64C46.0605 57.2756 10.674 26.7876 0 0Z" fill="#FDB93B"/>
        </svg>
        </div>
        <div data-svg-wrapper style={{left: 7.50, top: 0.17, position: 'absolute'}}>
        <svg width="65" height="75" viewBox="0 0 65 75" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M65.0001 0.168549V9.66855C46.3611 38.1527 33.0872 54.7624 2.50002 75C2.50002 75 0.5 68.5 0.500122 68C0.500244 67.5 43.0001 37.9112 65.0001 0.168549Z" fill="#FEC441"/>
        </svg>
        </div>
        <div data-svg-wrapper style={{left: 135, top: 70, position: 'absolute'}}>
        <svg width="56" height="8" viewBox="0 0 56 8" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M1 0H56L54 8H0L1 0Z" fill="#FEC441"/>
        </svg>
        </div>
    </div>
    <div style={{width: 253, height: 321, left: 946, top: 482.50, position: 'absolute'}}>
        <div data-svg-wrapper style={{left: 15, top: 3.50, position: 'absolute'}}>
        <svg width="241" height="121" viewBox="0 0 241 121" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M63.2021 3C85.5211 50.2838 99.6522 75.4286 127.554 118L236 102.5L187.14 3H63.2021Z" fill="#F8E0B1"/>
        <path d="M63.2021 3C47.7858 48.8189 35.9031 74.0827 6 118H127.554C99.6522 75.4286 85.5211 50.2838 63.2021 3Z" fill="#F8E0B1"/>
        <path d="M63.2021 3C47.7858 48.8189 35.9031 74.0827 6 118H127.554M63.2021 3C85.5211 50.2838 99.6522 75.4286 127.554 118M63.2021 3H187.14L236 102.5L127.554 118" stroke="#E37806" stroke-width="6"/>
        </svg>
        </div>
        <div data-svg-wrapper style={{left: 16, top: 103.50, position: 'absolute'}}>
        <svg width="229" height="203" viewBox="0 0 229 203" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M3 20.458V200H122.089V20.458H3Z" fill="#F8E0B1"/>
        <path d="M122.089 20.458V200L226 167.084V4L122.089 20.458Z" fill="#F8E0B1"/>
        <path d="M122.089 20.458H3V200H122.089M122.089 20.458V200M122.089 20.458L226 4V167.084L122.089 200" stroke="#E37806" stroke-width="6"/>
        </svg>
        </div>
        <div style={{width: 110, height: 0, left: 76, top: 118.50, position: 'absolute', transform: 'rotate(-90deg)', transformOrigin: 'top left', border: '6px #E37806 solid'}}></div>
        <div data-svg-wrapper style={{left: 51, top: 120, position: 'absolute'}}>
        <svg width="19" height="43" viewBox="0 0 19 43" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M14 42.5C14.2457 22.2692 13.3451 5.96586 0.999999 4.5" stroke="#E37806" stroke-width="8"/>
        </svg>
        </div>
        <div data-svg-wrapper style={{left: 87.91, top: 112.97, position: 'absolute'}}>
        <svg width="21" height="41" viewBox="0 0 21 41" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M3.99973 40.0001C6.46368 18.1524 3.68871 6.98149 20 4.5" stroke="#E37806" stroke-width="8"/>
        </svg>
        </div>
        <div style={{width: 50.93, height: 0, left: 96, top: 120.50, position: 'absolute', transform: 'rotate(43deg)', transformOrigin: 'top left', border: '8px #E37806 solid'}}></div>
        <div style={{width: 43.19, height: 0, left: 19, top: 151.50, position: 'absolute', transform: 'rotate(-42deg)', transformOrigin: 'top left', border: '8px #E37806 solid'}}></div>
        <div style={{width: 47.20, height: 0, left: 137, top: 155.50, position: 'absolute', transform: 'rotate(-54deg)', transformOrigin: 'top left', border: '8px #E37806 solid'}}></div>
        <div data-svg-wrapper style={{left: 135.50, top: 263, position: 'absolute'}}>
        <svg width="53" height="40" viewBox="0 0 53 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M0.5 10L53 0.5V23.5L0.5 40V10Z" fill="#E09799"/>
        </svg>
        </div>
        <div data-svg-wrapper style={{left: 43.78, top: 150.39, position: 'absolute'}}>
        <svg width="59" height="133" viewBox="0 0 59 133" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M4.49994 43.8866C4.73495 18.5324 18.4822 5.33753 30.4659 4.44154C36.4386 3.99498 42.5314 6.45389 47.2561 12.5959C52.0378 18.8121 55.5137 28.9688 55.5001 43.8509C55.4561 91.9598 55.4809 119.341 55.4938 128.998C55.4942 129.275 55.2704 129.5 54.9919 129.5H4.94638C4.65534 129.5 4.458 129.28 4.4555 129.033C4.34707 118.324 4.10487 86.5085 4.49994 43.8866Z" fill="#B6341A" stroke="#E2720A" stroke-width="7"/>
        </svg>
        </div>
        <div data-svg-wrapper style={{left: 71, top: 0.50, position: 'absolute'}}>
        <svg width="182" height="117" viewBox="0 0 182 117" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M0 0H127.5L182 98L65.5 117C35.6537 74.2104 21.4814 48.4811 0 0Z" fill="#D04F20"/>
        </svg>
        </div>
        <div data-svg-wrapper style={{left: 70.50, top: 0.50, position: 'absolute'}}>
        <svg width="68" height="127" viewBox="0 0 68 127" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M1.5 15L0.5 0C24.9502 45.6106 33.8106 68.1175 67.6525 117L66 126.5C36.1271 81.1351 24.852 66.2561 1.5 15Z" fill="#FD9159"/>
        </svg>
        </div>
        <div data-svg-wrapper style={{left: 136, top: 98.50, position: 'absolute'}}>
        <svg width="117" height="29" viewBox="0 0 117 29" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M1.5 18.5L117 0L115.5 8L0 28.5L1.5 18.5Z" fill="#A72316"/>
        </svg>
        </div>
        <div style={{width: 128, height: 30, left: 8, top: 272.50, position: 'absolute', background: '#E09799'}} />
        <div data-svg-wrapper style={{left: 0, top: 272, position: 'absolute'}}>
        <svg width="96" height="50" viewBox="0 0 96 50" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M44 0.5H95.5L44 49.5L0 47.5L44 0.5Z" fill="#E67607"/>
        </svg>
        </div>
        <div data-svg-wrapper style={{left: 44, top: 271.50, position: 'absolute'}}>
        <svg width="52" height="50" viewBox="0 0 52 50" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M52 0V31L0 49.5L52 0Z" fill="#BC4900"/>
        </svg>
        </div>
        <div data-svg-wrapper style={{left: 8.09, top: 0, position: 'absolute'}}>
        <svg width="64" height="127" viewBox="0 0 64 127" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M62.4997 0.5L63.4997 15.5C48.7509 59.4195 33.2273 87.2431 5.49991 126.5C5.49991 126.5 -2.57648 120.628 1 120.5C4.57648 120.372 48.6824 50.5404 62.4997 0.5Z" fill="#FD9159"/>
        </svg>
        </div>
    </div>
    <div style={{width: 296, height: 599, left: 1122, top: 258, position: 'absolute'}}>
        <div style={{width: 273, height: 250.36, left: 12, top: 348.64, position: 'absolute', background: '#FECCBC', border: '10px #E37806 solid'}} />
        <div style={{width: 257, height: 67.84, left: 20, top: 524.47, position: 'absolute', background: '#C94722'}} />
        <div style={{width: 233, height: 129.96, left: 32, top: 218.69, position: 'absolute', background: '#FECCBC', border: '10px #E37806 solid'}} />
        <div data-svg-wrapper style={{left: 17, top: 84, position: 'absolute'}}>
        <svg width="264" height="135" viewBox="0 0 264 135" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M19.4733 129.472L5.58875 5H257.891L243.543 129.472H19.4733Z" fill="#FECCBC" stroke="#E37806" stroke-width="10"/>
        </svg>
        </div>
        <div style={{width: 296, height: 15.29, left: 0, top: 341.96, position: 'absolute', background: '#E37806', boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)'}} />
        <div data-svg-wrapper style={{left: 176, top: 418.40, position: 'absolute'}}>
        <svg width="40" height="86" viewBox="0 0 40 86" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g filter="url(#filter0_d_37_42)">
        <path d="M4.00004 0.400024L4 77.8H36C35.0155 19.5892 27.7267 3.31989 4.00004 0.400024Z" fill="#E37806"/>
        </g>
        <defs>
        <filter id="filter0_d_37_42" x="0" y="0.400024" width="40" height="85.4" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
        <feFlood flood-opacity="0" result="BackgroundImageFix"/>
        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
        <feOffset dy="4"/>
        <feGaussianBlur stdDeviation="2"/>
        <feComposite in2="hardAlpha" operator="out"/>
        <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
        <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_37_42"/>
        <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_37_42" result="shape"/>
        </filter>
        </defs>
        </svg>
        </div>
        <div data-svg-wrapper style={{left: 176, top: 414.58, position: 'absolute'}}>
        <svg width="64" height="93" viewBox="0 0 64 93" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g filter="url(#filter0_d_37_32)">
        <path d="M4 12.5673C25.8685 -2.83534 38.1311 -3.99173 60 12.5673V84.6666H4V12.5673Z" fill="#8D320B"/>
        <path d="M7 81.6666V14.1327C17.1935 7.09884 24.7695 3.70459 32.0506 3.58125C39.2911 3.45859 46.8476 6.56878 57 14.0695V81.6666H7Z" stroke="#E37806" stroke-width="6"/>
        </g>
        <defs>
        <filter id="filter0_d_37_32" x="0" y="0.577759" width="64" height="92.0889" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
        <feFlood flood-opacity="0" result="BackgroundImageFix"/>
        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
        <feOffset dy="4"/>
        <feGaussianBlur stdDeviation="2"/>
        <feComposite in2="hardAlpha" operator="out"/>
        <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
        <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_37_32"/>
        <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_37_32" result="shape"/>
        </filter>
        </defs>
        </svg>
        </div>
        <div data-svg-wrapper style={{left: 232, top: 420.31, position: 'absolute'}}>
        <svg width="38" height="84" viewBox="0 0 38 84" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g filter="url(#filter0_d_37_40)">
        <path d="M34 0.311157L34 75.8H4C4.92299 19.0265 11.7563 3.15893 34 0.311157Z" fill="#E37806"/>
        </g>
        <defs>
        <filter id="filter0_d_37_40" x="0" y="0.311157" width="38" height="83.4889" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
        <feFlood flood-opacity="0" result="BackgroundImageFix"/>
        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
        <feOffset dy="4"/>
        <feGaussianBlur stdDeviation="2"/>
        <feComposite in2="hardAlpha" operator="out"/>
        <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
        <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_37_40"/>
        <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_37_40" result="shape"/>
        </filter>
        </defs>
        </svg>
        </div>
        <div style={{width: 253, height: 17, left: 23, top: 209, position: 'absolute', background: '#E37806', boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)'}} />
        <div style={{width: 265, height: 14, left: 20, top: 524, position: 'absolute', background: '#D05919', boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.40)'}} />
        <div style={{width: 13, height: 249.40, left: 117, top: 345.78, position: 'absolute', background: '#E37806'}} />
        <div data-svg-wrapper style={{left: 30, top: 406, position: 'absolute'}}>
        <svg width="77" height="192" viewBox="0 0 77 192" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M4 188V20.5033C18.1467 9.09768 28.5757 4.01999 38.5056 4.00005C48.4282 3.98013 58.8556 9.01031 73 20.4946V188H4Z" fill="#8D320B" stroke="#E37806" stroke-width="8"/>
        </svg>
        </div>
        <div style={{width: 141, height: 76, left: 77, top: 244, position: 'absolute', background: '#8D320B', border: '7px #E37806 solid'}} />
        <div style={{width: 7, height: 64, left: 144, top: 250, position: 'absolute', background: '#E37806'}} />
        <div data-svg-wrapper style={{left: 42, top: 5, position: 'absolute'}}>
        <svg width="219" height="80" viewBox="0 0 219 80" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M110 0L218.5 80H0L110 0Z" fill="#FECCBC"/>
        </svg>
        </div>
        <div data-svg-wrapper style={{left: 13, top: 0, position: 'absolute'}}>
        <svg width="335" height="169" viewBox="0 0 335 169" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g filter="url(#filter0_d_37_52)">
        <path d="M308 131C249.606 102.204 219.096 81.324 169 35C126.464 72.8821 97.814 93.6108 52 119.081C45.0923 122.921 37.7945 126.869 30 131" stroke="#FDC33F" stroke-width="20"/>
        </g>
        <defs>
        <filter id="filter0_d_37_52" x="0.317261" y="0.496696" width="337.106" height="168.472" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
        <feFlood flood-opacity="0" result="BackgroundImageFix"/>
        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
        <feOffset dy="4"/>
        <feGaussianBlur stdDeviation="12.5"/>
        <feComposite in2="hardAlpha" operator="out"/>
        <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.45 0"/>
        <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_37_52"/>
        <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_37_52" result="shape"/>
        </filter>
        </defs>
        </svg>
        </div>
        <div style={{width: 69, height: 79, left: 114, top: 112, position: 'absolute', background: '#8D320B', border: '7px #E37806 solid'}} />
        <div data-svg-wrapper style={{left: 150.92, top: 113.40, position: 'absolute'}}>
        <svg width="35" height="40" viewBox="0 0 35 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M2.92053 1.39954C11.3993 17.4779 18.0602 25.3007 32.9205 37.3995" stroke="#E37806" stroke-width="5"/>
        </svg>
        </div>
        <div data-svg-wrapper style={{left: 116.08, top: 150.39, position: 'absolute'}}>
        <svg width="36" height="41" viewBox="0 0 36 41" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M2.08374 38.3944C17.417 25.9718 24.2397 17.8927 33.0837 1.39444" stroke="#E37806" stroke-width="5"/>
        </svg>
        </div>
        <div data-svg-wrapper style={{left: 180.87, top: 152.65, position: 'absolute'}}>
        <svg width="35" height="38" viewBox="0 0 35 38" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M32.8746 2.65405C18.6991 13.9195 12.1718 21.3993 2.87463 36.6541" stroke="#E37806" stroke-width="5"/>
        </svg>
        </div>
        <div data-svg-wrapper style={{left: 149.13, top: 187.65, position: 'absolute'}}>
        <svg width="35" height="38" viewBox="0 0 35 38" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M32.1254 36.6541C23.2339 20.789 16.6119 13.3973 2.12537 2.65405" stroke="#E37806" stroke-width="5"/>
        </svg>
        </div>
    </div>
    <div style={{width: 673, height: 684, left: 38, top: 157, position: 'absolute'}}>
        <div data-svg-wrapper style={{left: 0, top: 0, position: 'absolute'}}>
        <svg width="659" height="225" viewBox="0 0 659 225" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M659 225L596.118 0H65.3969L0 225H659Z" fill="#F4AD38"/>
        </svg>
        </div>
        <div style={{width: 415.49, height: 229.30, left: 0, top: 454.31, position: 'absolute', background: '#DF9695', border: '10px #E37806 solid'}} />
        <div data-svg-wrapper style={{left: 30, top: 531, position: 'absolute'}}>
        <svg width="81" height="67" viewBox="0 0 81 67" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M4.00003 27.5022C-9.49997 14.0022 15.5 0.002167 15.5 0.002167C15.5 0.002167 16.719 -0.00270875 17.5 0.002167C36.8887 0.123204 45.5 7.50217 66.5 8.00217C87.5 8.50217 80.5 32.5022 77 41.0022C73.5 49.5022 60 49.5022 45.5 63.5022C31 77.5021 17.5 41.0022 4.00003 27.5022Z" fill="#DB7F7C"/>
        </svg>
        </div>
        <div style={{width: 415.49, height: 229.30, left: 0, top: 225.01, position: 'absolute', background: '#F9E0B5', border: '11px #E37806 solid'}} />
        <div style={{width: 243.06, height: 229.30, left: 415.49, top: 454.31, position: 'absolute', background: '#F9E0B5'}} />
        <div style={{width: 243.06, height: 229.30, left: 415.49, top: 225.01, position: 'absolute', background: '#F9E0B5'}} />
        <div data-svg-wrapper style={{left: 410.02, top: 87.97, position: 'absolute'}}>
        <svg width="250" height="140" viewBox="0 0 250 140" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M126.504 0.000267654L249.981 139.034L0.980919 138.966L126.504 0.000267654Z" fill="#FBE9C5"/>
        </svg>
        </div>
        <div style={{width: 13, height: 459, left: 411, top: 225, position: 'absolute', background: '#E37806'}} />
        <div style={{width: 18.34, height: 458.60, left: 640.21, top: 225.01, position: 'absolute', background: '#E37806'}} />
        <div style={{width: 225, height: 13, left: 415, top: 452, position: 'absolute', background: '#E37806'}} />
        <div style={{width: 225, height: 14, left: 415, top: 670, position: 'absolute', background: '#E37806'}} />
        <div style={{width: 225, height: 15, left: 415, top: 225, position: 'absolute', background: '#E37806'}} />
        <div style={{width: 16.51, height: 136.66, left: 528.31, top: 88.35, position: 'absolute', background: '#E37806'}} />
        <div data-svg-wrapper style={{left: 542.07, top: 158.06, position: 'absolute'}}>
        <svg width="69" height="71" viewBox="0 0 69 71" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M0.0651855 46.6145L55.5662 0.0575867L68.8552 16.2341L0.0651855 70.682V46.6145Z" fill="#E37806"/>
        </svg>
        </div>
        <div data-svg-wrapper style={{left: 528.31, top: 160.81, position: 'absolute'}}>
        <svg width="72" height="72" viewBox="0 0 72 72" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M71.3073 47.366L14.3262 0.809174L0.682846 16.9857L71.3073 71.4336V47.366Z" fill="#E37806"/>
        </svg>
        </div>
        <div style={{width: 17, height: 435, left: 468, top: 235, position: 'absolute', background: '#E37806'}} />
        <div data-svg-wrapper style={{left: 107, top: 357.74, position: 'absolute'}}>
        <svg width="110" height="110" viewBox="0 0 110 110" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M0 11.737L11.3284 0.408573L109.051 98.1307L97.7221 109.459L0 11.737Z" fill="#E37806"/>
        </svg>
        </div>
        <div data-svg-wrapper style={{left: 149, top: 486, position: 'absolute'}}>
        <svg width="109" height="75" viewBox="0 0 109 75" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M2.125 25.9701C11.125 11.9701 9.125 9.97014 23.125 2.97014C47.3741 -2.51471 58.1989 -0.893051 71.625 11.9701C85.0512 24.8333 114.125 20.4701 107.125 38.9701C100.125 57.4701 97.125 56.4701 88.625 56.9701C80.125 57.4701 82.625 67.4701 60.125 73.4701C37.625 79.4701 15.625 53.9701 15.625 53.9701C15.625 53.9701 -6.875 39.9701 2.125 25.9701Z" fill="#DB7F7C"/>
        </svg>
        </div>
        <div data-svg-wrapper style={{left: 277, top: 472, position: 'absolute'}}>
        <svg width="114" height="174" viewBox="0 0 114 174" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M24.5433 52.3114C13.5433 34.8114 6.54331 25.3114 20.0433 14.3114C33.5433 3.31143 26.5434 -2.18857 43.5433 0.811426C60.5432 3.81143 105.543 16.3114 110.043 25.8114C114.543 35.3114 118.543 86.3114 90.0433 70.3114C61.5433 54.3114 35.5433 69.8114 24.5433 52.3114Z" fill="#DB7F7C"/>
        <path d="M10.0432 135.811C-4.45685 128.811 5.04321 115.811 6.54321 108.311C8.04321 100.811 -6.45678 99.3115 3.54322 86.3115C13.5432 73.3115 49.5432 76.3115 60.5432 86.3115C71.5432 96.3115 66.0433 100.311 66.0433 110.811C66.0433 121.311 96.5432 117.811 97.5432 131.311C98.5432 144.811 83.0432 160.311 74.0432 170.311C65.0432 180.311 48.5434 160.811 43.5433 152.311C38.5432 143.811 24.5433 142.811 10.0432 135.811Z" fill="#DB7F7C"/>
        </svg>
        </div>
        <div data-svg-wrapper style={{left: 535.50, top: 63, position: 'absolute'}}>
        <svg width="138" height="178" viewBox="0 0 138 178" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M0.5 28V0L138 155V178L0.5 28Z" fill="#FDC33F"/>
        </svg>
        </div>
        <div data-svg-wrapper style={{left: 536, top: 62, position: 'absolute'}}>
        <svg width="140" height="182" viewBox="0 0 140 182" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M140 28.6292V0L0 158.483V182L140 28.6292Z" fill="#FDC33F"/>
        </svg>
        </div>
        <div data-svg-wrapper style={{left: 479.03, top: 485.94, position: 'absolute'}}>
        <svg width="120" height="188" viewBox="0 0 120 188" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M5.98952 183.229L4.54598 31.577C25.2872 14.2344 41.0498 5.74432 56.8553 5.44609C72.689 5.14732 89.731 13.0549 113.04 31.6718L114.483 183.229H5.98952Z" fill="#8D320B" stroke="#E37806" stroke-width="9"/>
        </svg>
        </div>
        <div style={{width: 17, height: 435, left: 583, top: 235, position: 'absolute', background: '#E37806'}} />
        <div style={{width: 401, height: 10, left: 9, top: 350, position: 'absolute', background: '#E37806'}} />
        <div style={{width: 98, height: 61, left: 485, top: 327, position: 'absolute', background: '#8D320B', border: '5px #E37806 solid'}} />
        <div style={{width: 13.49, height: 136.33, left: 253.54, top: 453.94, position: 'absolute', transform: 'rotate(-135deg)', transformOrigin: 'top left', background: '#E37806'}} />
        <div style={{width: 14.69, height: 146.43, left: 340.16, top: 359.48, position: 'absolute', transform: 'rotate(-32deg)', transformOrigin: 'top left', background: '#E37806'}} />
        <div style={{width: 17.12, height: 143.55, left: 111, top: 350.32, position: 'absolute', transform: 'rotate(30deg)', transformOrigin: 'top left', background: '#E37806'}} />
        <div style={{width: 105, height: 115, left: 179, top: 284, position: 'absolute', background: '#8D320B', border: '8px #E37806 solid'}} />
        <div style={{width: 104, height: 11, left: 482, top: 393, position: 'absolute', background: '#E37806', boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)'}} />
        <div data-svg-wrapper style={{left: 483, top: 375, position: 'absolute'}}>
        <svg width="102" height="18" viewBox="0 0 102 18" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M0 18C0 18 5.95847 0.179747 14.3996 0.179747C22.8408 0.179747 28.7993 9.77527 35.7508 7.71909C42.7024 5.6629 42.2058 -1.19104 59.0882 0.179747C75.9705 1.55054 72.9913 11.8315 80.4393 9.77527C87.8874 7.71909 93.3494 4.29217 98.3148 3.60672C103.28 2.92127 101.791 18 101.791 18H0Z" fill="#9E9627"/>
        </svg>
        </div>
        <div style={{width: 121, height: 12, left: 475, top: 515, position: 'absolute', background: '#E37806', boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)'}} />
        <div data-svg-wrapper style={{left: 107, top: 585, position: 'absolute'}}>
        <svg width="84" height="69" viewBox="0 0 84 69" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M82.117 32.5C70.117 56.5 75.6169 71.5 39.6169 68.5C3.61697 65.5 5.6169 52.3823 5.6169 32.5C5.6169 12.6177 -10.8552 0 12.6169 0C36.089 0 94.1169 8.5 82.117 32.5Z" fill="#DB7F7C"/>
        </svg>
        </div>
        <div data-svg-wrapper style={{left: 13, top: 467, position: 'absolute'}}>
        <svg width="66" height="46" viewBox="0 0 66 46" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M58.5 35.6109C37 54.6106 48 30.1109 36.5 39.611C25 49.1111 0 44.9998 0 35.611C0 26.2221 19 -8.8889 33 2.11098C47 13.1109 80 16.6111 58.5 35.6109Z" fill="#DB7F7C"/>
        </svg>
        </div>
        <div data-svg-wrapper style={{left: 214.33, top: 590.50, position: 'absolute'}}>
        <svg width="49" height="56" viewBox="0 0 49 56" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M6.50002 24.5C2.06033 6.79204 5.73716 1.76194 22 0.5C29.3065 2.91493 32.0838 5.35476 30 15.5C37.3658 18.4995 40.5741 21.7241 43 33C52.7202 45.509 48.2546 50.3629 22 55C-1.36523 51.7628 -2.40293 43.9046 6.50002 24.5Z" fill="#DB7F7C" stroke="#DB7F7C"/>
        </svg>
        </div>
    </div>
    <div data-svg-wrapper style={{left: 215, top: 36, position: 'absolute'}}>
    <svg width="989" height="200" viewBox="0 0 989 200" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g filter="url(#filter0_d_20_36)">
    <path d="M748.973 115.383L863.048 138.06L740.994 184.08L748.973 115.383Z" fill="#9C8369"/>
    <path d="M740.994 184.08L984.435 191.417L916.405 136.726L984.435 98.0424L836.369 82.7023V143.396L740.994 184.08Z" fill="#C4A484"/>
    </g>
    <path d="M241.267 115.522L124.38 138.758L249.443 185.913L241.267 115.522Z" fill="#9C8369"/>
    <path d="M249.443 185.913L3.05176e-05 193.431L69.7075 137.391L3.05176e-05 97.7537L151.716 82.0353V144.225L249.443 185.913Z" fill="#C4A484"/>
    <g filter="url(#filter1_d_20_36)">
    <path d="M145.398 35.0498C414.142 -11.2163 565.972 -12.1479 839.037 35.0498V136.06C583.156 79.8688 431.522 78.9716 145.398 136.06V35.0498Z" fill="#C4A484"/>
    </g>
    <defs>
    <filter id="filter0_d_20_36" x="736.994" y="82.7023" width="251.441" height="116.715" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
    <feFlood flood-opacity="0" result="BackgroundImageFix"/>
    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
    <feOffset dy="4"/>
    <feGaussianBlur stdDeviation="2"/>
    <feComposite in2="hardAlpha" operator="out"/>
    <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
    <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_20_36"/>
    <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_20_36" result="shape"/>
    </filter>
    <filter id="filter1_d_20_36" x="141.398" y="0" width="701.64" height="144.06" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
    <feFlood flood-opacity="0" result="BackgroundImageFix"/>
    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
    <feOffset dy="4"/>
    <feGaussianBlur stdDeviation="2"/>
    <feComposite in2="hardAlpha" operator="out"/>
    <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
    <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_20_36"/>
    <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_20_36" result="shape"/>
    </filter>
    </defs>
    </svg>
    </div>
    <div style={{width: 218, height: 27, left: 683, top: 77, position: 'absolute', color: 'black', fontSize: 40, fontFamily: 'Inika', fontWeight: '400', wordWrap: 'break-word'}}>{problem.num1} + {problem.num2} = ?</div>
    {/* frog first line below */}
    <img style={{width: 156, height: 140, left: 739, top: 850, position: 'absolute'}} img src={frogImage} alt="Frog"/>  
    <div className="flies-container" style={{ display: 'flex', gap: '20px' }}>
        {flies.length > 0 ? (
          flies.map((flyNumber, index) => (
            <div 
              key={index} 
              className={`fly ${selectedAnswer === flyNumber ? 'selected' : ''}`}
              onClick={() => handleFlyClick(flyNumber)}
              style={{
                cursor: 'pointer', 
                textAlign: 'center',
                padding: '10px', 
                margin: '5px', 
                border: '2px solid black', 
                display: 'inline-block', 
                backgroundColor: selectedAnswer === flyNumber ? '#ffcccb' : 'white' // Highlight selection
              }}
            >
              <img 
                src={flyImage} 
                alt={`Fly with number ${flyNumber}`} 
                style={{ width: '80px', height: '80px' }}
              />
              <p style={{ margin: '5px 0', fontSize: '20px', fontWeight: 'bold' }}>{flyNumber}</p>
            </div>
          ))
        ) : (
          <p>No flies available</p>
        )}
      </div>
    {/* <img style={{width: 183, height: 183, left: 254, top: 401, position: 'absolute'}} src="https://placehold.co/183x183" />
    <img style={{width: 183, height: 183, left: 1096, top: 323, position: 'absolute'}} src="https://placehold.co/183x183" />
    <img style={{width: 183, height: 183, left: 843, top: 464, position: 'absolute'}} src="https://placehold.co/183x183" />
    <img style={{width: 183, height: 183, left: 556, top: 342, position: 'absolute'}} src="https://placehold.co/183x183" /> */}
    <div style={{width: 428, height: 56, left: 541, top: 43, position: 'absolute', color: 'black', fontSize: 35, fontFamily: 'Indie Flower', fontWeight: '400', wordWrap: 'break-word'}}>ADDITION QUESTIONS </div>
</div>
  );
}
export default AdditionLevel;
