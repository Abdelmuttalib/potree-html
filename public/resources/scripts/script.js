function displayViewer(x) {
  if (x.innerHTML === "Semantic Segmentation") {
    document.querySelector("#outputSSViewer").removeAttribute("hidden");
    document.querySelector("#outputDEMViewer").setAttribute("hidden", true);
    document.querySelector("#outputMBTViewer").setAttribute("hidden", true);
    document.querySelector("#inputViewer").setAttribute("hidden", true);
    document.querySelector("#outputSbSViewer").setAttribute("hidden", true);
  } else if (x.innerHTML === "DEM") {
    document.querySelector("#outputDEMViewer").removeAttribute("hidden");
    document.querySelector("#outputSSViewer").setAttribute("hidden", true);
    document.querySelector("#outputMBTViewer").setAttribute("hidden", true);
    document.querySelector("#inputViewer").setAttribute("hidden", true);
    document.querySelector("#outputSbSViewer").setAttribute("hidden", true);
  } else if (x.innerHTML === "MBT") {
    document.querySelector("#outputMBTViewer").removeAttribute("hidden");
    document.querySelector("#outputSSViewer").setAttribute("hidden", true);
    document.querySelector("#outputDEMViewer").setAttribute("hidden", true);
    document.querySelector("#inputViewer").setAttribute("hidden", true);
    document.querySelector("#outputSbSViewer").setAttribute("hidden", true);
  } else if (x.innerHTML === "Input") {
    document.querySelector("#inputViewer").removeAttribute("hidden");
    document.querySelector("#outputSSViewer").setAttribute("hidden", true);
    document.querySelector("#outputMBTViewer").setAttribute("hidden", true);
    document.querySelector("#outputDEMViewer").setAttribute("hidden", true);
    document.querySelector("#outputSbSViewer").setAttribute("hidden", true);
  } else if (x.innerHTML === "Side By Side") {
    document.querySelector("#outputSbSViewer").removeAttribute("hidden");
    document.querySelector("#outputSSViewer").setAttribute("hidden", true);
    document.querySelector("#outputDEMViewer").setAttribute("hidden", true);
    document.querySelector("#inputViewer").setAttribute("hidden", true);
    document.querySelector("#outputMBTViewer").setAttribute("hidden", true);
  }
}

function getCesView(id, coordinates) {
  // Cesium.Ion.defaultAccessToken = null;

  const url = `http://47.97.51.98:3018/tilesets/ceef4d05-4d64-4813-b54d-e072cf03f599`;
  console.log(url);
  Cesium.Ion.defaultAccessToken =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI0MDM5YmM3Ny04YzYyLTQ2MGYtOTdiYS0wYjI3NmZhZDE1YzQiLCJpZCI6ODMzODMsImlhdCI6MTY0NTU1NTY0OX0.G66gzLqpQ1G_aithQezBU-2indI7lb4wetge7c0HYPM";
  var viewer = new Cesium.Viewer("outputDEMViewer", {
    terrainProvider: new Cesium.CesiumTerrainProvider({
      url: url,
      requestVertexNormals: true,
    }),
  });
  //ul,ll,lr,ur
  coordinates = JSON.stringify(coordinates);
  console.log(coordinates);
  function getLarger(x, y) {
    if (x > y) {
      return x;
    } else if (x < y) {
      return y;
    } else {
      return x;
    }
  }
  function getSmaller(x, y) {
    if (x < y) {
      return x;
    } else if (x > y) {
      return y;
    } else {
      return x;
    }
  }
  const w = getSmaller(coordinates[0][0], coordinates[1][0]);
  const s = getSmaller(coordinates[1][1], coordinates[2][1]);
  const e = getLarger(coordinates[2][0], coordinates[3][0]);
  const n = getLarger(coordinates[0][1], coordinates[3][1]);
  var rectangle = Cesium.Rectangle.fromDegrees(w, s, e, n);
  const redRectangle = viewer.entities.add({
    name: "Red translucent rectangle",
    rectangle: {
      coordinates: rectangle,
      material: Cesium.Color.YELLOW.withAlpha(0.3),
    },
  });

  var target = viewer.scene.camera.getRectangleCameraCoordinates(rectangle);
  var cartographic = Cesium.Cartographic.fromCartesian(target);
  cartographic.height += 700;
  target = Cesium.Cartesian3.fromRadians(
    cartographic.longitude,
    cartographic.latitude,
    cartographic.height
  );
  viewer.camera.flyTo({
    destination: target,
  });
}

function expand() {
  var element = document.getElementById("sidenav");
  element.classList.remove("is-collapsed");
}

function collapse() {
  var element = document.getElementById("sidenav");
  element.classList.add("is-collapsed");
}

function toggle() {
  var element = document.getElementById("sidenav");
  element.classList.toggle("is-collapsed");
}
