import "@/css/loader.css";

function Loader({variant}: {variant? : string}) {
  return <div className={`spinner ${variant}-loader`}></div>;
}

export default Loader;
