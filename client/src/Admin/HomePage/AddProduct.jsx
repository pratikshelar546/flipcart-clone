import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import { AiOutlineDelete } from "react-icons/ai";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { addProduct } from "../../redux/reducers/Products/productAction";
const AddProduct = () => {
  const categories = ["laptop", "Mobile", "Fasion", "gaming", "electronics"];
  const dispatch = useDispatch();
  const {_id} = JSON.parse(localStorage.getItem('AdminDetail'))
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [isOffer, setIsoffer] = useState();
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [offerPrice, setOfferPrice] = useState(0);
  const [Highlights, setHighlights] = useState([]);
  const [specification, setSpecification] = useState([]);
  const [brandName, setBrandName] = useState();
  const [brandLogo, setBrandLogo] = useState();
  const [key, setKey] = useState("");
  const [image, setImage] = useState([]);
  const [services, setServices] = useState([]);

  const [highlightInput, setHighlightInput] = useState("");
  const [specsInupt, setSpecsInupt] = useState({
    title: "",
    description: "",
  });

  const productSubmit = (e) => {
    e.preventDefault();
    if (Highlights.length <= 0) {
      toast.error("Add Hightlights of product", {
        position: toast.POSITION.TOP_RIGHT,
      });
      return;
    }
    if (specification.length <= 0) {
      toast.error("Add specification of product", {
        position: toast.POSITION.TOP_RIGHT,
      });
      return;
    }
    const data = {
      admin:_id,
      title,
      description,
      price,
      offerPrice,
      isOffer,
      category,
      quantity,
      Highlights,
      specification,
      brand: {
        Name: brandName,
        logo: brandLogo,
      },
      image,
      services,
      key,
    };
    console.log(data);
    dispatch(addProduct(data)).then((data) => console.log(data));
  };

  const addHighlight = () => {
    setHighlights([...Highlights, highlightInput]);
    setHighlightInput("");
  };
  const deleteHighlight = (index) => {
    setHighlights(Highlights.filter((h, i) => i !== index));
  };
  const handleSpecsChange = (e) => {
    setSpecsInupt({
      ...specsInupt,
      [e.target.name]: e.target.value,
      // _id: random.toString(),
    });
  };
  const addSpecs = () => {
    // setSpecification({...specification,specsInupt});
    if (!specsInupt.title.trim() || !specsInupt.title.trim()) return;
    setSpecification([...specification, specsInupt]);
    setSpecsInupt({ title: "", description: "" });
  };
  // console.log(specification);
  const deleteSpec = (index) => {
    setSpecification(specification.filter((h, i) => i !== index));
  };
  const imageSave = (e) => {
    // console.log(e.target.value);
    const files = Array.from(e.target.files);
    // console.log(files);
    // setImage([]);

    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setImage((old) => [...old, reader.result]);
        }
      };
      reader.readAsDataURL(file);
    });
  };
  const logoSave = (e) => {
    const files = Array.from(e.target.files);
    // console.log(files);
    // setImage([]);

    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setBrandLogo(() => reader.result);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  // const deleteSpec= () => {};

  return (
    <>
      {loading ? (
        <>
          <div className="w-full h-full flex justify-center ">
            <iframe
              src="https://lottie.host/?file=adbf2be0-5e20-479c-ac8b-63afb952b7a7/KmWdrrTqCZ.json"
              title="loading"
            ></iframe>
          </div>
        </>
      ) : (
        <>
          <form
            onSubmit={productSubmit}
            encType="multipart/form-data"
            className="flex flex-col sm:flex-row bg-white rounded-lg shadow p-4"
            id="mainform"
          >
            <div className="flex flex-col gap-3 m-2 sm:w-1/2">
              <TextField
                label="title"
                variant="outlined"
                size="small"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <TextField
                label="description"
                multiline
                rows={3}
                required
                variant="outlined"
                size="small"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
              <div className="flex justify-between">
                <TextField
                  label="price"
                  type="number"
                  variant="outlined"
                  size="small"
                  InputProps={{
                    inputProps: {
                      min: 0,
                    },
                  }}
                  required
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
                <TextField
                  label="offerPrice"
                  type="number"
                  variant="outlined"
                  size="small"
                  InputProps={{
                    inputProps: {
                      min: 0,
                    },
                  }}
                  required
                  value={offerPrice}
                  onChange={(e) => setOfferPrice(e.target.value)}
                />
                <TextField
                  label="offer"
                  type="text"
                  variant="outlined"
                  size="small"
                  InputProps={{
                    inputProps: {
                      min: 0,
                    },
                  }}
                  required
                  value={isOffer}
                  onChange={(e) => setIsoffer(e.target.value)}
                />
              </div>
              <div className="flex justify-between gap-4">
                <TextField
                  label="category"
                  select
                  fullWidth
                  variant="outlined"
                  size="small"
                  required
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  {categories.map((el, i) => (
                    <MenuItem value={el} key={i}>
                      {el}
                    </MenuItem>
                  ))}
                </TextField>
                <TextField
                  label="quantity"
                  type="number"
                  variant="outlined"
                  size="small"
                  InputProps={{
                    inputProps: {
                      min: 0,
                    },
                  }}
                  required
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                />
                <TextField
                  label="key"
                  type="text"
                  variant="outlined"
                  size="small"
                  InputProps={{
                    inputProps: {
                      min: 0,
                    },
                  }}
                  required
                  value={key}
                  onChange={(e) => setKey(e.target.value)}
                />
              </div>
              <TextField
                label="services"
                type="text"
                variant="outlined"
                size="small"
                InputProps={{
                  inputProps: {
                    min: 0,
                  },
                }}
                // required
                value={services[0]}
                onChange={(e) => setServices(e.target.value)}
              />

              <div className="flex flex-col gap-2">
                <div className="flex justify-between items-center border rounded">
                  <input
                    value={highlightInput}
                    onChange={(e) => setHighlightInput(e.target.value)}
                    type="text"
                    placeholder="Highlight"
                    className="px-2 flex-1 outline-none border-none"
                  />
                  <span
                    onClick={() => addHighlight()}
                    className="py-2 px-6 bg-orange-500 text-white rounded-r hover:shadow-lg cursor-pointer"
                  >
                    Add
                  </span>
                </div>

                <div className="flex flex-col gap-1.5">
                  {Highlights.map((h, i) => (
                    <div className="flex justify-between rounded items-center py-1 px-2 bg-green-50">
                      <p className="text-green-800 text-sm font-medium">{h}</p>
                      <span
                        onClick={() => deleteHighlight(i)}
                        className="text-red-600 hover:bg-red-100 p-1 rounded-full cursor-pointer"
                      >
                        <AiOutlineDelete size={"1.3em"} />
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-2 m-2 sm:w-1/2">
              <h2 className="font-medium">Brand Details</h2>
              <div className="flex justify-between gap-4 items-start">
                <TextField
                  label="brandName"
                  type="text"
                  variant="outlined"
                  size="small"
                  required
                  value={brandName}
                  onChange={(e) => setBrandName(e.target.value)}
                />
                <div className="w-24 h-10 flex items-center justify-center border rounded-lg">
                  {!brandLogo ? (
                    // <ImageIcon />
                    <h1>image</h1>
                  ) : (
                    <img
                      draggable="false"
                      src={brandLogo}
                      alt="Brand Logo"
                      className="w-full h-full object-contain"
                    />
                  )}
                </div>
                <label className="rounded font-medium bg-gray-400 text-center cursor-pointer text-white py-2 px-2.5 shadow hover:shadow-lg">
                  <input
                    type="file"
                    name="logo"
                    accept="image/*"
                    onChange={logoSave}
                    className="hidden"
                  />
                  Choose Logo
                </label>
              </div>
              <h2 className="font-medium">Specifications</h2>

              <div className="flex justify-evenly gap-2 items-center">
                <TextField
                  value={specification.title}
                  onChange={handleSpecsChange}
                  name="title"
                  label="Name"
                  placeholder="Model No"
                  variant="outlined"
                  size="small"
                />
                <TextField
                  value={specification.description}
                  onChange={handleSpecsChange}
                  name="description"
                  label="Description"
                  placeholder="WJDK42DF5"
                  variant="outlined"
                  size="small"
                />
                <span
                  onClick={() => addSpecs()}
                  className="py-2 px-6 bg-orange-500 text-white rounded hover:shadow-lg cursor-pointer"
                >
                  Add
                </span>
              </div>

              <div className="flex flex-col gap-1.5">
                {specification.map((spec, i) => (
                  <div className="flex justify-between items-center text-sm rounded bg-blue-50 py-1 px-2">
                    <p className="text-gray-500 font-medium">{spec.title}</p>
                    <p>{spec.description}</p>
                    <span
                      onClick={() => deleteSpec(i)}
                      className="text-red-600 hover:bg-red-200 bg-red-100 p-1 rounded-full cursor-pointer"
                    >
                      <AiOutlineDelete size={"1.2rem"} />
                      {/* <DeleteIcon /> */}
                    </span>
                  </div>
                ))}
              </div>

              <h2 className="font-medium">Product Images</h2>
              <div className="flex gap-2 overflow-x-auto h-32 border rounded">
                {image &&
                  image?.map((image, i) => (
                    <div key={i}>
                      {/* <AiFillDelete color="red" /> */}
                      <img
                        draggable="false"
                        src={image}
                        alt="Product"
                        className="w-full h-full object-contain"
                      />
                    </div>
                  ))}
              </div>
              <label className="rounded font-medium bg-gray-400 text-center cursor-pointer text-white p-2 shadow hover:shadow-lg my-2">
                <input
                  type="file"
                  name="image"
                  accept="image/*"
                  multiple
                  onChange={imageSave}
                  className="hidden"
                />
                Choose Files
              </label>

              <div className="flex justify-end">
                <input
                  form="mainform"
                  type="submit"
                  className="bg-orange-500 uppercase w-1/3 p-3 text-white font-medium rounded shadow hover:shadow-lg cursor-pointer"
                  value="Update"
                />
              </div>
            </div>
          </form>
        </>
      )}
    </>
  );
};

export default AddProduct;
