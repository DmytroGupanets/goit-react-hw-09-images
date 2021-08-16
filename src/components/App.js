import React, { useEffect, useState } from "react";
import ImageGallery from "./imageGallery/ImageGallery";
import Searchbar from "./searchbar/Searchbar";
import Modal from "./modal/Modal";
import Button from "./button/Button";
import fetchPicturesApi from "../services/pixabayApi";
import Loader from "react-loader-spinner";

export default function App() {
  const [pictures, setPictures] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [originalPictureSize, setOriginalPictureSize] = useState("");
  const [originalPictureTag, setOriginalPictureTag] = useState("");
  const [loaderIsVisible, setLoaderIsVisible] = useState(false);

  useEffect(() => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: "smooth",
    });
  });

  const onFormSubmit = async (query) => {
    resetState();
    setSearchQuery(query);
    const response = await fetchPicturesApi(query, currentPage);
    setPictures((prevState) => [...prevState, ...response]);
    setCurrentPage(currentPage + 1);
  };

  const resetState = () => {
    setCurrentPage(1);
    setPictures([]);
  };

  const onLoadMore = async () => {
    setLoaderIsVisible(true);

    const response = await fetchPicturesApi(searchQuery, currentPage);
    console.log(response);
    setPictures((prevState) => [...prevState, ...response]);
    setLoaderIsVisible(false);
    setCurrentPage(currentPage + 1);
  };

  const toggleModal = (url, tag) => {
    setShowModal((prevState) => !prevState);
    setOriginalPictureSize(url);
    setOriginalPictureTag(tag);
  };

  const shouldRenderShowMoreButton = pictures.length > 0;

  return (
    <>
      <Searchbar onFormSubmit={onFormSubmit} />
      <ImageGallery pictures={pictures} toggleModal={toggleModal} />
      {shouldRenderShowMoreButton && (
        <Button loadMore={onLoadMore}>
          {loaderIsVisible ? (
            <Loader type="ThreeDots" color="#FFFFFF" height={18} width={30} />
          ) : (
            <span>Load more</span>
          )}
        </Button>
      )}

      {showModal && (
        <Modal
          url={originalPictureSize}
          alt={originalPictureTag}
          toggleModal={toggleModal}
        />
      )}
    </>
  );
}

// class App extends Component {
//   state = {
//     pictures: [],
//     searchQuery: "",
//     currentPage: 1,
//     showModal: false,
//     originalPictureSize: "",
//     originalPictureTag: "",
//     loaderVisible: false,
//   };

//   componentDidUpdate(prevProps, prevState) {
//     if (prevState.searchQuery !== this.state.searchQuery) {
//       this.fetchPictures();
//     }

// window.scrollTo({
//   top: document.documentElement.scrollHeight,
//   behavior: "smooth",
// });
//   }

// onFormSubmit = (query) => {
//   this.setState({ searchQuery: query, currentPage: 1, pictures: [] });
// };

// fetchPictures = () => {
//   const { searchQuery, currentPage } = this.state;
//   const options = { searchQuery, currentPage };

//   this.setState({ loaderVisible: true });

//   fetchPicturesApi(options)
//     .then((response) =>
//       this.setState((prevState) => ({
//         pictures: [...prevState.pictures, ...response],
//         currentPage: prevState.currentPage + 1,
//       }))
//     )
//     .catch(console.log)
//     .finally(() => this.setState({ loaderVisible: false }));
// };

// toggleModal = (url, tag) => {
//   this.setState(({ showModal }) => ({
//     showModal: !showModal,
//     originalPictureSize: url,
//     originalPictureTag: tag,
//   }));
// };

//   render() {
//     const { pictures, originalPictureSize, originalPictureTag, loaderVisible } =
//       this.state;
//

//     return (
// <>
//   <Searchbar onSubmit={this.onFormSubmit} />
//   <ImageGallery pictures={pictures} toggleModal={this.toggleModal} />
//   {shouldRenderShowMoreButton && (
//     <Button loadMore={this.fetchPictures}>
//       {loaderVisible ? (
//         <Loader type="ThreeDots" color="#FFFFFF" height={18} width={30} />
//       ) : (
//         <span>Load more</span>
//       )}
//     </Button>
//   )}

//   {this.state.showModal && (
//     <Modal
//       url={originalPictureSize}
//       alt={originalPictureTag}
//       toggleModal={this.toggleModal}
//     />
//   )}
// </>
//     );
//   }
// }

// export default App;
