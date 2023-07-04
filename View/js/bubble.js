var changeBubble = null;

document.addEventListener("DOMContentLoaded", function () {
  var client = new BlipChat();

  var bubble;
  var bubbleContainer;
  var closeIcon;

  const iconId = "blip-chat-icon";
  const closeId = "blip-chat-close-icon";
  const chatContainer = "blip-chat-container";

  const startingColor = "#ffffff";
  const displayClassName = "display";
  const hideClassName = "hide";

  const appKey =
    "cm91dGVyY2lhczoyYzk5OGM5MC1lNjA1LTQ0MTQtOTVjNy1kN2JlNDM1YjdmYzM=";

  const customUrl = "https://giulianno-iervolino-cbzqp.chat.blip.ai/";
  const bottomImage =
    // "https://blipmediastore.blob.core.windows.net/public-medias/Media_24f41f95-57b6-4e54-a05e-7129101c688f";
    "https://s3-sa-east-1.amazonaws.com/infobots/fiat/customer-care/icon-white-vector.svg";
  const topImage =
    "https://blipmediastore.blob.core.windows.net/public-medias/Media_24f41f95-57b6-4e54-a05e-7129101c688f";
  // "https://s3-sa-east-1.amazonaws.com/infobots/fiat/customer-care/icon-gray-vector.svg";

  const bubbleMessage = "Olá, posso ajudar?";

  const startMessage = {
    type: "text/plain",
    content: "COMEÇAR",
    metadata: {
      "#blip.hiddenMessage": true,
    },
  };

  function displayBubble() {
    bubble.classList.add(displayClassName);
    bubble.classList.remove(hideClassName);
  }

  function hideBubble() {
    bubble.classList.add(hideClassName);
    bubble.classList.remove(displayClassName);
  }

  changeBubble = function () {
    if (bubble.classList.contains(displayClassName)) hideBubble();
    else displayBubble();
  };

  function createBubble() {
    bubbleContainer = document.createElement("div");
    bubbleContainer.id = "bubble-container";

    bubble = document.createElement("div");
    bubble.id = "message-bubble";
    bubble.onclick = function () {
      client.widget._openChat();
    };

    var triangle = document.createElement("div");
    triangle.id = "triangle";

    var message = document.createElement("div");
    message.id = "message";
    message.innerHTML = bubbleMessage;

    bubble.appendChild(message);
    bubble.appendChild(triangle);
    bubbleContainer.appendChild(bubble);

    document.querySelector(`#${chatContainer}`).prepend(bubbleContainer);
  }

  function replaceImageStructure() {
    closeIcon = document.querySelector(`#${closeId}`);
    var oldImage = document.querySelector(`#${iconId}`);

    var container = document.createElement("div");
    container.id = iconId;

    var img1 = document.createElement("img");
    img1.src = topImage;
    img1.classList.add("top");

    var img2 = document.createElement("img");
    img2.src = bottomImage;
    img2.classList.add("bottom");

    container.appendChild(img1);
    container.appendChild(img2);

    oldImage.parentElement.insertBefore(container, oldImage);
    oldImage.remove();
  }

  client
    .withAppKey(appKey)
    .withButton({
      color: startingColor,
      icon: "https://blipmediastore.blob.core.windows.net/public-medias/Media_24f41f95-57b6-4e54-a05e-7129101c688f",
    })
    .withCustomCommonUrl(customUrl)
    // .withEventHandler(BlipChat.CREATE_ACCOUNT_EVENT, function () {
    // client.sendMessage(startMessage);
    // })
    .withEventHandler(BlipChat.ENTER_EVENT, function () {
      closeIcon.classList.add(displayClassName);
      closeIcon.classList.remove(hideClassName);
      hideBubble();
    })
    .withEventHandler(BlipChat.LEAVE_EVENT, function () {
      closeIcon.classList.add(hideClassName);
      closeIcon.classList.remove(displayClassName);
    })
    .build();

  replaceImageStructure();
  createBubble();

  displayBubble();
  setTimeout(function () {
    hideBubble();
  }, 10000);
});
