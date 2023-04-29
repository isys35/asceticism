import PropTypes from "prop-types";

// pi-power-off

function ProfileMenuButton({icon, mainText, secondaryText, onClick}) {
  const btnClasses = "cursor-pointer flex surface-border mb-3 p-3 align-items-center border-1 surface-border border-round hover:surface-hover transition-colors transition-duration-150";
  return (
    <li>
      <a
        className={btnClasses}
        onClick={onClick}
      >
        <span>
          <i className={`pi ${icon} text-xl text-primary`}></i>
        </span>
        <div className="ml-3">
          <span className="mb-2 font-semibold">{mainText}</span>
          <p className="text-color-secondary m-0">{secondaryText}</p>
        </div>
      </a>
    </li>
  );
}


ProfileMenuButton.propTypes = {
  icon: PropTypes.string,
  mainText: PropTypes.string,
  secondaryText: PropTypes.string,
  onClick: PropTypes.func
};


export default ProfileMenuButton;