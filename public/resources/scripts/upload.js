var features = { DEM: false, MBT: false, OP: false, SemanticSeg: false };
let path;
let id;
var monoBuildFiltValue = "";
var monoBuildClusterValue = "";

function readUrl(input) {
  if (input.files && input.files[0]) {
    console.log(input.files[0].size);
    let imgName = input.files[0].name;
    let imgSize = formatBytes(input.files[0].size);
    input.setAttribute("data-title", `${imgName} (${imgSize})`);
  }

  function formatBytes(bytes, decimals = 2) {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
  }
}
function updateFeatures(key) {
  features[key] = !features[key];
  if (
    features["SemanticSeg"] == true ||
    features["DEM"] == true ||
    features["MBT"] == true ||
    features["OP"] == true
  ) {
    document.querySelector("#start-proc").removeAttribute("disabled");
  }
  if (
    features["SemanticSeg"] == false &&
    features["DEM"] == false &&
    features["MBT"] == false &&
    features["OP"] == false
  ) {
    document.querySelector("#start-proc").setAttribute("disabled", true);
  }
  console.log(features);
  if (key === "MBT") {
    document.querySelector("#mbt-config").removeAttribute("hidden");
  }
}
async function uploadProjectFeatures(dataID) {
  console.log("uploadProjectFeatures", dataID);
  monoBuildFiltValue = document.querySelector("#monoBuildFiltSlider").value;
  monoBuildClusterValue = document.querySelector(
    "#monoBuildClusterSlider"
  ).value;
  var response = await axios({
    method: "post",
    url: "http://47.97.51.98:3001/api/data/projectFeatures",
    data: {
      dataID: dataID,
      features: features,
      monoBuildFiltValue: monoBuildFiltValue,
      monoBuildClusterValue: monoBuildClusterValue,
    },
  }).then(() => {
    window.location.href = "/upload";
  });

  console.log(response);
}
