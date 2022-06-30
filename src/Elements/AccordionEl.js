import React from "react";
import { Link, useHistory } from "react-router-dom";

const AccordionEl = ({ menuObject }) => {
  const { id, list, title, iconUrl, path } = menuObject;
  const history = useHistory();
  const { pathname } = history.location;

  const stylesFn = (tagPath) => {
    const condition1 = Boolean(pathname == tagPath);

    return {
      backgroundColor: condition1 ? "rgba(85, 129, 179, 1)" : "",
      color: condition1 ? "white" : "",
      listStyle: "none",
      paddingLeft: "20px",
      paddingBlock: "5px",
    };
  };

  const styles = {
    menuButton: {
      backgroundColor: "white",
      padding: "1rem 1.25rem",
      cursor: "pointer",
    },
    linkTag: {
      textDecoration: "none",
    },
    icon: {
      width: "15px",
      marginRight: "5px",
    },
  };

  return (
    <div className="accordion accordion-flush " id={`idContainer-${id}`}>
      <div className="accordion-item">
        <div className="accordion-header" id={`flush-heading-${id}`}>
          {list.length ? (
            <button
              className="accordion-button text-primary"
              style={styles.menuButton}
              type="button"
              data-bs-toggle="collapse"
              data-bs-target={`#flush-collapse-${id}`}
              aria-expanded="true"
              aria-controls={`flush-collapse-${id}`}
            >
              <img src={iconUrl} style={styles.icon} />
              <span className="body-1">{title || ""}</span>
            </button>
          ) : (
            <div className="pt-3">
              <Link style={styles.linkTag} to={path}>
                <li style={stylesFn(path)}>
                  <img src={iconUrl} style={styles.icon} />
                  <span>{title || ""}</span>
                </li>
              </Link>
            </div>
          )}
        </div>
        <div
          id={`flush-collapse-${id}`}
          className="accordion-collapse collapse show"
          aria-labelledby={`flush-heading-${id}`}
          data-bs-parent={`#idContainer-${id}`}
        >
          {list.length ? (
            <div className="accordion-body px-0">
              {list.map((item, index) => {
                return (
                  <Link style={styles.linkTag} to={item?.path} key={index}>
                    <li style={stylesFn(item.path)}>{item?.label}</li>
                  </Link>
                );
              })}
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
};

export default AccordionEl;
