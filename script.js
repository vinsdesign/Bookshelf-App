document.addEventListener("DOMContentLoaded", function () {
  const submitForm = document.getElementById("form");
  submitForm.addEventListener("submit", function (event) {
    event.preventDefault();
    addDataBooks();
  });
  function addDataBooks() {
    const title = document.getElementById("bookTitle").value;
    const author = document.getElementById("author").value;
    const year = document.getElementById("publicationYear").value;
    const publisher = document.getElementById("publisher").value;
    const synopsis = document.getElementById("synopsis").value;

    const generateID = generateId();
    const dataBooksObject = generateDataBooksObject(
      generateID,
      title,
      author,
      year,
      publisher,
      synopsis,
      false
    );
    dataBooks.push(dataBooksObject);

    document.dispatchEvent(new Event(RENDER_EVENT));
  }
  // generate ID
  function generateId() {
    return +new Date();
  }
  // generate data Object
  function generateDataBooksObject(
    id,
    textTitle,
    nameAuthor,
    publishYear,
    companyPublisher,
    textSynopsis,
    finishedReading
  ) {
    return {
      id,
      textTitle,
      nameAuthor,
      publishYear,
      companyPublisher,
      textSynopsis,
      finishedReading,
    };
  }

  const dataBooks = [];
  const RENDER_EVENT = "render-data";
  document.addEventListener(RENDER_EVENT, function () {
    console.log(dataBooks);
  });

  function makeDataBooks(dataBooksObject) {
    const title = document.createElement("h3");
    title.innerText = dataBooksObject.textTitle;
    title.classList.add("pb-4");

    const author = document.createElement("p");
    author.innerText = dataBooksObject.nameAuthor;

    const year = document.createElement("p");
    year.innerText = dataBooksObject.publishYear;

    const publisher = document.createElement("p");
    publisher.innerText = dataBooksObject.companyPublisher;

    const synopsis = document.createElement("p");
    synopsis.innerText = dataBooksObject.textSynopsis;

    const textContainer = document.createElement("div");
    textContainer.classList.add("px-1");
    textContainer.append(title, author, year, publisher, synopsis);

    const container = document.createElement("div");
    container.classList.add("item", "shadow");
    container.append(textContainer);
    container.setAttribute("id", `data-${dataBooks.id}`);
  }
});
