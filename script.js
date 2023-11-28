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
    const unFinishedReading = document.getElementById("unFinishedReading");
    unFinishedReading.innerHTML = "";

    const finishedReading = document.getElementById("finishedReading");
    finishedReading.innerHTML = "";

    for (const dataBooksItem of dataBooks) {
      const booksElement = makeDataBooks(dataBooksItem);
      if (!dataBooksItem.finishedReading) {
        unFinishedReading.append(booksElement);
      } else finishedReading.append(booksElement);
    }
  });

  function makeDataBooks(dataBooksObject) {
    // field title
    const title = document.createElement("h4");
    title.innerText = dataBooksObject.textTitle;
    title.classList.add("py-2", "text-primary", "fw-bold");

    // field author
    const author = document.createElement("p");
    author.innerText = "Author : " + dataBooksObject.nameAuthor;

    // field year
    const year = document.createElement("p");
    year.innerText = "Year : " + dataBooksObject.publishYear;

    // fiel publisher
    const publisher = document.createElement("p");
    publisher.innerText = "Publisher : " + dataBooksObject.companyPublisher;

    // fiel synopsis
    const synopsis = document.createElement("p");
    synopsis.innerText = dataBooksObject.textSynopsis;
    synopsis.classList.add("text-secondary");

    // container icon button edit, delete
    const buttonContainer = document.createElement("div");
    buttonContainer.classList.add("d-flex", "gap-2");

    // field textContainer
    const textContainer = document.createElement("div");
    textContainer.classList.add("px-1");
    textContainer.append(
      title,
      author,
      year,
      publisher,
      synopsis,
      buttonContainer
    );
    const container = document.createElement("div");
    container.classList.add("my-2");
    container.append(textContainer);
    container.setAttribute("id", `data-${dataBooks.id}`);

    if (dataBooksObject.finishedReading) {
      const iconRefresh = document.createElement("ion-icon");
      iconRefresh.setAttribute("name", `refresh`);
      const refreshButton = document.createElement("button");
      refreshButton.classList.add(
        "btn",
        "btn-danger",
        "d-flex",
        "align-items-center",
        "gap-2"
      );
      refreshButton.append(iconRefresh);

      // field trashButton
      const iconTrash = document.createElement("ion-icon");
      iconTrash.setAttribute("name", `trash`);

      const trashButton = document.createElement("button");
      trashButton.innerText = "Hapus Data";
      trashButton.classList.add(
        "btn",
        "btn-danger",
        "d-flex",
        "align-items-center",
        "gap-2"
      );
      trashButton.append(iconTrash);

      // field editButton
      const iconEdit = document.createElement("ion-icon");
      iconEdit.setAttribute("name", `create-outline`);

      const editButton = document.createElement("button");
      editButton.innerText = "edit";
      editButton.classList.add(
        "btn",
        "btn-info",
        "d-flex",
        "align-items-center",
        "text-light",
        "gap-2"
      );
      editButton.append(iconEdit);
      container.append(trashButton, editButton, refreshButton);
    } else {
      const iconCheck = document.createElement("ion-icon");
      iconCheck.setAttribute("name", `checkmark`);
      const checkButton = document.createElement("button");
      checkButton.innerText = "Finish";
      checkButton.classList.add(
        "btn",
        "btn-danger",
        "d-flex",
        "align-items-center",
        "gap-2"
      );

      checkButton.append(iconCheck);
      checkButton.addEventListener("click", function () {
        finishedReading(dataBooksObject.id);
      });
      container.append(checkButton);
    }
    return container;
  }
  function finishedReading(booksId) {
    const booksTarget = findBooks(booksId);

    if (booksTarget == null) return;

    booksTarget.finishedReading = true;
    document.dispatchEvent(new Event(RENDER_EVENT));
  }

  function findBooks(booksId) {
    for (const dataBooksItem of dataBooks) {
      if (dataBooksItem.id === booksId) {
        return dataBooksItem;
      }
    }
    return null;
  }
});
