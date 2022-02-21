import Menu from "./Menu";


const Base = ({
  title = "My title",
  description = "Description",
  className = "bg-dark text-white p-4",
  children,
}) => {
  return (
    <div>
    <Menu/>
      <div className="container-fluid">
        <div className="jumbotron bg-dark text-white text-center">
          <h2 className="display-4">{title}</h2>
          <p className="lead">{description}</p>
        </div>
        {/*  */}
        <div className={className}>{children}</div>
      </div>
      {/* <footer className="footer bg-dark mt-auto py-3">
        <div className="container-fluid bg-success text-white text-center py-3">
          <h1 className="text-white">Faq</h1>
          <button className="btn btn-lg btn-warning">contact us</button>
        </div>
        <div className="container">
          <span className="text-muted text-center">An Amazig <span className="text-white">T-shirts </span>  Onlie Shopping App </span>
        </div>
      </footer> */}
    </div>
  );
};
export default Base;
