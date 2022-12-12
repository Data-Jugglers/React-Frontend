import React from "react";
import { useState } from "react";

export default function N3() {
  const [openForm, setOpenForm] = useState(false);
  const [viewName, setViewName] = useState();
  const [oneColumn, setOneColumn] = useState(true);
  const [menuOne, setMenuOne] = useState(0);
  const [menuTwo, setMenuTwo] = useState(0);

  const changeState = () => {
    switch (openForm) {
      case false:
        setOpenForm(true);
        break;
      case true:
        setOpenForm(false);
        break;
      default:
        break;
    }
  };

  const changeColumn = (id) => {
    switch (id) {
      case "ColumnCheck1":
        setOneColumn(true);
        break;
      case "ColumnCheck2":
        setOneColumn(false);
        break;
      default:
        break;
    }
  };

  const cancel = () => {
    setOpenForm(false);
    setViewName();
    setOneColumn(true);
    setMenuOne(0);
    setMenuTwo(0);
  };

  const addView = (id) => {
    switch (id) {
      case "menuOne":
        setMenuOne(menuOne + 1);
        console.log(menuOne);
        break;
      case "menuTwo":
        setMenuTwo(menuTwo + 1);
        break;
      default:
        break;
    }
  };

  const save = () => {
    // save first form info
  };

  return (
    <>
      <button
        type="button"
        className="btn btn-outline-dark"
        onClick={changeState}
      >
        Create View
      </button>
      <div>
        {openForm ? (
          <form className="row g-3">
            <div className="col-md-4">
              <label className="form-label">Name of view</label>
              <input
                type="text"
                className="form-control"
                id="NameOfView"
                value={viewName}
                onChange={(e) => setViewName(e.target.value)}
                required
              />
            </div>
            <div className="col-12">
              <div className="form-check">
                <input
                  type="radio"
                  className="form-check-input"
                  id="ColumnCheck1"
                  name="radio-stacked"
                  required
                  onClick={(e) => changeColumn(e.target.id)}
                />
                <label className="form-check-label">One column</label>
              </div>
              <div className="form-check mb-3">
                <input
                  type="radio"
                  className="form-check-input"
                  id="ColumnCheck2"
                  name="radio-stacked"
                  required
                  onClick={(e) => changeColumn(e.target.id)}
                />
                <label className="form-check-label">Two columns</label>
              </div>
            </div>
            <div>
              {oneColumn ? (
                <div>
                  <select className="form-select">
                    <option value="1">V1</option>
                    <option value="3">V3</option>
                    <option value="4">V4</option>
                    <option value="5">V5</option>
                    <option value="6">V6</option>
                    <option value="7">V7</option>
                    <option value="8">V8</option>
                    <option value="9">V9</option>
                  </select>
                  <button
                    onClick={(e) => addView(e.target.id)}
                    type="button"
                    id="menuOne"
                  >
                    Add
                  </button>
                </div>
              ) : (
                <div>
                  <div>
                    <select className="form-select">
                      <option value="1">V1</option>
                      <option value="3">V3</option>
                      <option value="4">V4</option>
                      <option value="5">V5</option>
                      <option value="6">V6</option>
                      <option value="7">V7</option>
                      <option value="8">V8</option>
                      <option value="9">V9</option>
                    </select>
                    <button
                      onClick={(e) => addView(e.target.id)}
                      type="button"
                      id="menuOne"
                    >
                      Add
                    </button>
                    <select className="form-select">
                      <option value="1">V1</option>
                      <option value="3">V3</option>
                      <option value="4">V4</option>
                      <option value="5">V5</option>
                      <option value="6">V6</option>
                      <option value="7">V7</option>
                      <option value="8">V8</option>
                      <option value="9">V9</option>
                    </select>
                    <button
                      onClick={(e) => addView(e.target.id)}
                      type="button"
                      id="menuOne"
                    >
                      Add
                    </button>
                  </div>
                </div>
              )}
            </div>
            <div className="col-12">
              <button
                className="btn btn-secondary"
                type="button"
                onClick={cancel}
              >
                Cancel
              </button>
              <button className="btn btn-primary" type="submit" onSubmit={save}>
                Save
              </button>
            </div>
          </form>
        ) : (
          <p></p>
        )}
      </div>
    </>
  );
}
