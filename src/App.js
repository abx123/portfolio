import React, { useEffect, useState } from 'react';
import './App.css';
import * as THREE from "three";
import bbImage from './assets/1.png'
import moonImage from './assets/moon.jpg'
import spaceImage from './assets/space.jpg'
import normal from './assets/normal_texture.jpg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGlobe, faCertificate, faTasks, faUniversity, faBriefcase, faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons'
import { faEnvelope, faFileAlt } from '@fortawesome/free-regular-svg-icons'
import { faFacebookSquare, faLinkedin, faGithubSquare, faAws, faGoogle, faMicrosoft, faHackerrank } from '@fortawesome/free-brands-svg-icons'
import ScrollToTop from "./ScrollToTop";
import axios from 'axios';
import Moment from 'react-moment';


function App() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [edu, setEdu] = useState([{ instituteName: "" }]);
  const [mooc, setMooc] = useState([{ name: "" }]);
  const [certifications, setCertifications] = useState([{ name: "" }]);
  const [experience, setExperience] = useState([{ title: "" }]);
  const [person, setPerson] = useState([{ name: "" }]);

  useEffect(() => {

    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    var renderer = new THREE.WebGLRenderer({
      canvas: document.querySelector('#bg'),
    });

    // renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.position.setZ(30);
    camera.position.setX(-3);

    renderer.render(scene, camera);

    // Torus

    const geometry = new THREE.TorusGeometry(10, 3, 16, 100);
    const material = new THREE.MeshStandardMaterial({ color: 0xff6347 });
    const torus = new THREE.Mesh(geometry, material);

    scene.add(torus);

    // Lights

    const pointLight = new THREE.PointLight(0xffffff);
    pointLight.position.set(5, 5, 5);

    const ambientLight = new THREE.AmbientLight(0xffffff);
    scene.add(pointLight, ambientLight);

    function addStar() {
      const geometry = new THREE.SphereGeometry(0.25, 24, 24);
      const material = new THREE.MeshStandardMaterial({ color: 0xffffff });
      const star = new THREE.Mesh(geometry, material);

      const [x, y, z] = Array(3)
        .fill()
        .map(() => THREE.MathUtils.randFloatSpread(100));

      star.position.set(x, y, z);
      scene.add(star);
    }

    Array(200).fill().forEach(addStar);

    // Background

    const spaceTexture = new THREE.TextureLoader().load(spaceImage);
    scene.background = spaceTexture;

    // Avatar

    const bbTexture = new THREE.TextureLoader().load(bbImage);

    const bb = new THREE.Mesh(new THREE.BoxGeometry(3, 3, 3), new THREE.MeshBasicMaterial({ map: bbTexture }));

    scene.add(bb);

    // Moon

    const moonTexture = new THREE.TextureLoader().load(moonImage);
    const normalTexture = new THREE.TextureLoader().load(normal);

    const moon = new THREE.Mesh(
      new THREE.SphereGeometry(3, 32, 32),
      new THREE.MeshStandardMaterial({
        map: moonTexture,
        normalMap: normalTexture,
      })
    );

    scene.add(moon);

    moon.position.z = 30;
    moon.position.setX(-10);

    bb.position.z = -5;
    bb.position.x = 2;

    // Scroll Animation

    function moveCamera() {
      const t = document.body.getBoundingClientRect().top;
      moon.rotation.x += 0.05;
      moon.rotation.y += 0.075;
      moon.rotation.z += 0.05;

      bb.rotation.y += 0.01;
      bb.rotation.z += 0.01;

      camera.position.z = t * -0.01;
      camera.position.x = t * -0.0002;
      camera.rotation.y = t * -0.0002;
    }

    document.body.onscroll = moveCamera;
    moveCamera();

    // Animation Loop

    function animate() {
      requestAnimationFrame(animate);

      torus.rotation.x += 0.01;
      torus.rotation.y += 0.005;
      torus.rotation.z += 0.01;

      bb.rotation.x += 0.005;
      bb.rotation.y += 0.005;
      bb.rotation.z += 0.005;

      moon.rotation.x += 0.005;

      // controls.update();

      renderer.render(scene, camera);
    }

    function getResume() {
      axios.get(`https://api.wmsam.dev/resume/5fce43ac93ea06c6dabec228`)
        .then(res => {
          const resume = res.data;
          setPerson(resume.person)
          setExperience(resume.experience)
          setEdu(resume.educations)
          setMooc(resume.mooc)
          setCertifications(resume.cetrifications)
          setIsLoaded(true)
        })
    }

    animate();

    getResume()


  }, []);
  return (
    <React.Fragment>
      <canvas id="bg"></canvas >
      {isLoaded ?
        <main>

          <header>
            <h1>Wing Ming SAM</h1>
            {/* 🚀  */}
            <p>Experienced fullstack engineer with multi-cloud certifications.</p>
            <div class="container">
              <a href="https://www.facebook.com/wmsam91/" target="_blank" rel="noreferrer">
                <FontAwesomeIcon icon={faFacebookSquare} />
              </a>
              <a href="https://www.linkedin.com/in/wmsam/" target="_blank" rel="noreferrer">
                <FontAwesomeIcon icon={faLinkedin} />
              </a>
              <a href="https://github.com/abx123" target="_blank" rel="noreferrer">
                <FontAwesomeIcon icon={faGithubSquare} />
              </a>
              <a href="https://www.wmsam.xyz" target="_blank" rel="noreferrer">
                <FontAwesomeIcon icon={faGlobe} />
              </a>
              <a href="mailto:wmsam91@gmail.com">
                <FontAwesomeIcon icon={faEnvelope} />
              </a>
              <a href="https://s3-ap-southeast-1.amazonaws.com/www.wmsam.xyz/2021+-+Resume.docx" target="_blank" rel="noreferrer">
                <FontAwesomeIcon icon={faFileAlt} />
              </a>
            </div>

          </header>


          <blockquote>
            <p>To learn something new, you need to try new things and not be afraid to be wrong. <br />-Roy T. Bennett</p>
          </blockquote>

          <section>
            <h2>📜 Manifesto</h2>
            <p>
              A typical kinesthetic learner and goal driven person with interest in everything. Enjoys dissecting things
              down to the smallest component and attempts to figure out the function of each and every part. Adaptable to
              any kind of environment.
            </p>
            <h2>📜 Skills</h2>
            {person.skills.map((s) =>
              <li>{s}</li>
            )}
          </section>
          <section class="left">
            <h2>🏫 Education</h2>
            {edu.map((e) =>
              <Edu edu={e} />
            )}
          </section>
          <section class="light">
            <h2>👩🏽‍🚀 Projects</h2>

            <h3>
              <FontAwesomeIcon icon={faTasks} />
              &nbsp;&nbsp;
              <a href="https://github.com/abx123/go-isbn" target="_blank" rel="noreferrer">
                Go-ISBN
              </a>
            </h3>
            <p>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Simple golang package to get book details using ISBN.<br />
              <i>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- written using Golang
              </i>
            </p>
            <h3>
              <FontAwesomeIcon icon={faTasks} />
              &nbsp;&nbsp;
              <a href="https://github.com/abx123/library" target="_blank" rel="noreferrer">
                Library API
              </a>
            </h3>
            <p>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Simple REST API backend to keep track of all my books.
              &nbsp;&nbsp;
              <FontAwesomeIcon icon={faExternalLinkAlt} />
              &nbsp;&nbsp;
              <a href="https://library.wmsam.xyz/" target="_blank" rel="noreferrer">
                API Documentation
              </a>
              <br />
              <i>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- written using Golang, data stored in mysql, dockerized and hosted with AWS ECS
              </i>
            </p>
            <h3>
              <FontAwesomeIcon icon={faTasks} />
              &nbsp;&nbsp;
              <a href="https://github.com/abx123/crawler" target="_blank" rel="noreferrer">
                Novel crawler
              </a>
            </h3>
            <p>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Crawls novelfull.com for any web novel updates, stores them in firebase and sends a notification to slack channel to inform on new chapters.<br />
              <i>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- written using Golang, data stored in Firebase, hosted using AWS Lambda behind AWS API Gateway
              </i>
            </p>
            <h3>
              <FontAwesomeIcon icon={faTasks} />
              &nbsp;&nbsp;
              <a href="https://github.com/abx123/apiv2" target="_blank" rel="noreferrer">
                Novels API
              </a>

            </h3>
            <p>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Retrieves novel stored in firebase by scrapper.
              &nbsp;&nbsp;
              <FontAwesomeIcon icon={faExternalLinkAlt} />
              &nbsp;&nbsp;
              <a href="https://abx123.github.io/apiv2" target="_blank" rel="noreferrer">
                API Documentation
              </a>
              <br />
              <i>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- written using Golang, Firebase as data source, hosted using AWS Lambda behind AWS API Gateway
              </i>
            </p>
            <h3>
              <FontAwesomeIcon icon={faTasks} />
              &nbsp;&nbsp;
              <a href="https://github.com/abx123/bb-reader" target="_blank" rel="noreferrer">
                Novel reader
              </a>
              &nbsp;&nbsp;

            </h3>
            <p>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Simple UI to display all stored novels
              &nbsp;&nbsp;
              <FontAwesomeIcon icon={faExternalLinkAlt} />
              &nbsp;&nbsp;
              <a href="https://reader.wmsam.xyz/" target="_blank" rel="noreferrer">
                Link
              </a>
              <br />
              <i>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- written using ReactJS, hosted with AWS S3
              </i>
            </p>
            <h3>
              <FontAwesomeIcon icon={faTasks} />
              &nbsp;&nbsp;
              <a href="https://github.com/abx123/coronachan" target="_blank" rel="noreferrer">
                MY COVID-19 daily update bot
              </a>
            </h3>
            <p>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Scrapes Malaysia Ministry of Health twitter account for daily COVID updates and share them to slack channel. <br />
              <i>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; - written using Python, hosted with AWS Lambda
              </i>
            </p>
            <h3>
              <FontAwesomeIcon icon={faTasks} />
              &nbsp;&nbsp;
              <a href="https://github.com/abx123/resume-api" target="_blank" rel="noreferrer">
                Resume API
              </a>
            </h3>
            <p>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Stores all data needed to populate my portfolio site.
              &nbsp;&nbsp;
              <FontAwesomeIcon icon={faExternalLinkAlt} />
              &nbsp;&nbsp;
              <a href="https://abx123.github.io/resume-api" target="_blank" rel="noreferrer">
                API Documentation
              </a>
              <br />
              <i>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- written using Java spring boot, data stored using MongoDB, dockerized and hosted with AWS ECS
              </i>
            </p>
            <h3>
              <FontAwesomeIcon icon={faTasks} />
              &nbsp;&nbsp;
              <a href="https://github.com/abx123/portfolio" target="_blank" rel="noreferrer">
                Portfolio site
              </a>
            </h3>
            <p>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Static site to display data stored in mongoDB.<br />
              <i>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- written using ReactJS and ThreeJS, hosted with AWS S3
              </i>
            </p>
          </section>

          <section class="left">
            <h2>🌮 Work History</h2>
            {experience.map((e) =>
              <Work exp={e} />
            )}
          </section>

          <section>
            <h2>
              📜 Certifications
            </h2>
            {certifications.map(c => <Certifications certifications={c} />)}
          </section>
          <section class="left">
            <h2>
              📜 Massive Open Online Courses
            </h2>
            {mooc.map(m => <Moocs moocs={m} />)}
          </section>

          <ScrollToTop />
        </main>
        : null}
    </React.Fragment>

  );
}
function CertIcon(props) {
  let fa = null
  switch (props.issuedBy) {
    case "Amazon Web Services":
      fa = faAws
      break;
    case "Google Cloud":
      fa = faGoogle
      break;
    case "Google Cloud Platform":
      fa = faGoogle
      break;
    case "Microsoft":
      fa = faMicrosoft
      break;
    case "HackerRank":
      fa = faHackerrank
      break;
    default:
      fa = faCertificate
  }
  return (<FontAwesomeIcon icon={fa} />)
}

function Work(props) {
  const { title, companyName, location, startDate, endDate, description } = props.exp;
  return (
    <p>
      <FontAwesomeIcon icon={faBriefcase} />
      &nbsp;
      {title} @ {companyName} - {location}<br />
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      <Moment format="MM/YYYY">{startDate}</Moment> - <Moment format="MM/YYYY">{endDate}</Moment> <br />
      &nbsp;&nbsp;&nbsp;&nbsp;
      {description.map((d) =>
        <li>{d}</li>
      )}
    </p>
  )
}

function Edu(props) {
  const { type, instituteName, location, startDate, endDate, grade } = props.edu;
  return (
    <div>
      <FontAwesomeIcon icon={faUniversity} />
      &nbsp;
      {instituteName}, {location} - {type}<br />
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      <Moment format="MM/YYYY">{startDate}</Moment> - <Moment format="MM/YYYY">{endDate}</Moment> <br />
      &nbsp;&nbsp;&nbsp;&nbsp;
      Graduated with {grade}
    </div>
  )
}

function Certifications(props) {
  const { name, issuedBy, issueDate, expireDate, credentialURL } = props.certifications;
  return (
    <div>
      <h4>
        <CertIcon issuedBy={issuedBy} />
        &nbsp;&nbsp;
        <a href={credentialURL} target="_blank" rel="noreferrer">
          {name} By {issuedBy}
        </a>
      </h4>
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      Issue date: <Moment format="DD/MM/YYYY">{issueDate}</Moment> {expireDate == null ? null : <>valid till <Moment format="DD/MM/YYYY">{expireDate}</Moment></>}<br />
    </div>
  )
}

function Moocs(props) {
  const { name, issuedBy, issueDate, credentialURL } = props.moocs;
  return (
    <div>
      <h4>
        <CertIcon issuedBy={issuedBy} />
        &nbsp;&nbsp;
        <a href={credentialURL} target="_blank" rel="noreferrer">
          {name} By {issuedBy}
        </a>
      </h4>
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      Issue date: <Moment format="DD/MM/YYYY">{issueDate}</Moment><br />
    </div>
  )
}

export default App;
