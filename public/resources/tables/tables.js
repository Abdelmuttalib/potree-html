var tableLoaded = 0;
function areTablesLoaded() {
  if (tableLoaded >= 4) {
    document.querySelector("#loading-ring").setAttribute("hidden", true);
    document.querySelector("#tableEntries").style.opacity = 1;
  }
  console.log(tableLoaded);
}

const completedFiles = (username) => {
  $(document).ready(function () {
    async function getData(url) {
      const response = await fetch(url, {
        headers: {},
      });
      const dataSet = await response.json();
      $(document).ready(function () {
        let table = $("#completed-list").DataTable({
          columns: [
            {
              title: "Data ID",
              data: null,
              render: function (data, type, row) {
                const id = data.dataID;
                if (
                  data.status === "Complete" ||
                  data.status === "SemanticViewable"
                ) {
                  return `<a href="/dataView?id=${id}" class="text-center">${id}</a>`;
                } else {
                  return `${id}`;
                }
              },
            },
            { title: "Input Filename", data: "filename" },
            {
              title: "Date Added",
              data: "dateAdded",
            },
            {
              data: null,
              render: function (data, type, row) {
                const id = data.dataID;
                return `<a href="http://47.97.51.98:3001/api/data/delete?name=${username}&id=${id}" class="btn active btn-sm btn-danger text-center">x</a>`;
              },
            },
          ],
          columnDefs: [
            { width: "250px", targets: 0 },
            { width: "20px", className: "dt-body-center", targets: [3] },
          ],
          lengthChange: false,
          autoWidth: true,
          ordering: false,
          searching: false,
          processing: true,
          info: false,
          pagingType: "simple_numbers",
          data: dataSet,
          initComplete: function (settings, json) {
            tableLoaded += 1;
            areTablesLoaded();
          },
        });
      });
    }
    getData(`http://47.97.51.98:3001/api/data/completed?name=${username}`);
  });
};

const processingFiles = (username) => {
  $(document).ready(function () {
    async function getData(url) {
      const response = await fetch(url);
      await response.json().then((data) => {
        var columns = [
          { title: "Data ID", data: "dataID" },
          { title: "Input Filename", data: "filename" },
          { title: "Date Added", data: "dateAdded" },
          { title: "Task Type", data: "taskType", defaultContent: "Standby" },
          { title: "Progress", data: "percentage" },
        ];
        var table = $("#pending-list").DataTable({
          columns: columns,
          processing: true,
          deferRender: true,
          paging: true,
          searching: false,
          ordering: false,
          stateSave: false,
          info: false,
          lengthChange: false,
          data: data,
          initComplete: function (settings, json) {
            tableLoaded += 1;
            areTablesLoaded();
          },
          columnDefs: [
            { width: "250px", targets: 0 },
            {
              width: "120px",
              className: "dt-body-center",
              targets: 4,
              render: $.fn.dataTable.render.percentBar(),
            },
          ],
        });
        var socket = io.connect("http://47.97.51.98:3002/", {
          transports: ["websocket"],
        });
        socket.on("connect", (data) => {
          socket.emit("connected", "Connected na me");
        });

        socket.on("onPC", async (data) => {
          const response = await fetch(url)
            .json()
            .then((data) => {
              table.clear();
              table.rows.add(data).draw();
            });
        });
      });
    }

    getData(`http://47.97.51.98:3001/api/data/queued?name=${username}`);
  });
};

const zippedFiles = (username) => {
  $(document).ready(function () {
    async function getData(url) {
      const response = await fetch(url, {
        headers: {},
      });
      const dataSet = await response.json();
      $(document).ready(function () {
        let table = $("#zipped-list").DataTable({
          columnDefs: [
            { width: "250px", targets: 0 },
            { width: "20px", className: "dt-body-center", targets: [3] },
          ],
          lengthChange: false,
          autoWidth: true,
          ordering: false,
          searching: false,
          processing: true,
          info: false,
          pagingType: "simple_numbers",
          data: dataSet,
          initComplete: function (settings, json) {
            tableLoaded += 1;
            areTablesLoaded();
          },
          columns: [
            {
              title: "Data ID",
              data: "dataID",
            },
            { title: "Input Filename", data: "filename" },
            { title: "Date Added", data: "dateAdded" },
            {
              data: null,
              render: function (data, type, row) {
                const id = data.dataID;
                return `<a href="http://47.97.51.98:3001/api/data/delete?name=${username}&id=${id}" class="btn active btn-sm btn-danger text-center">x</a>`;
              },
            },
          ],
        });
      });
    }

    getData(`http://47.97.51.98:3001/api/data/zipped?name=${username}`);
  });
};

const unzippedFiles = (username) => {
  $(document).ready(function () {
    async function getData(url) {
      const response = await fetch(url, {
        headers: {},
      });
      const dataSet = await response.json();
      $(document).ready(function () {
        let table = $("#unzipped-list").DataTable({
          columns: [
            {
              title: "Data ID",
              data: null,
              render: function (data, type, row) {
                const id = data.dataID;
                return `<a href="/processing?id=${id}" class="text-center">${id}</a>`;
              },
            },
            { title: "Input Filename", data: "filename" },
            { title: "Date Added", data: "dateAdded" },
            {
              data: null,
              render: function (data, type, row) {
                const id = data.dataID;
                return `<a href="http://47.97.51.98:3001/api/data/delete?name=${username}&id=${id}" class="btn active btn-sm btn-danger text-center">x</a>`;
              },
            },
          ],
          columnDefs: [
            { width: "250px", targets: 0 },
            {
              width: "20px",
              autoWidth: false,
              className: "dt-body-center",
              targets: [3],
            },
          ],
          lengthChange: false,
          autoWidth: true,
          ordering: false,
          searching: false,
          processing: true,
          info: false,
          pagingType: "simple_numbers",
          data: dataSet,
          initComplete: function (settings, json) {
            tableLoaded += 1;
            areTablesLoaded();
          },
        });
      });
    }
    getData(`http://47.97.51.98:3001/api/data/unzipped?name=${username}`);
  });
};

const allFiles = (username) => {
  $(document).ready(function () {
    async function getData(url) {
      const response = await fetch(url, {
        headers: {},
      });
      const dataSet = await response.json();
      console.log(dataSet);
      $(document).ready(function () {
        let table = $("#all-list").DataTable({
          columns: [
            { title: "Project Name", data: "projName" },
            {
              title: "Data ID",
              data: null,
              render: function (data, type, row) {
                const id = data.dataID;
                return `<a href="/dataView?id=${id}" class="text-center">${id}</a>`;
              },
            },
            { title: "SemSeg Status", data: "SemSegStatus" },
            { title: "Progress", data: "SemSeg_percentage" },
            { title: "DEM Status", data: "DEMstatus" },
            { title: "Progress", data: "DEM_percentage" },
            { title: "MBT Status", data: "MBTstatus" },
            { title: "Progress", data: "MBT_percentage" },
            {
              data: null,
              render: function (data, type, row) {
                const id = data.dataID;
                return `<a href="/processing?id=${id}" class="btn btn-primary btn-sm me-2" style="font-size:0.8rem;">Process</a><a href="http://47.97.51.98:3001/api/data/delete?name=${username}&id=${id}" class="btn active btn-sm btn-danger text-center">Delete</a>`;
              },
            },
          ],
          columnDefs: [
            { width: "257px", targets: 1 },
            {
              width: "140px",
              autoWidth: false,
              className: "dt-body-center",
              targets: [8],
            },
            {
              width: "120px",
              className: "dt-body-center",
              targets: 3,
              render: $.fn.dataTable.render.percentBar(),
            },
            {
              width: "120px",
              className: "dt-body-center",
              targets: 5,
              render: $.fn.dataTable.render.percentBar(),
            },
            {
              width: "120px",
              className: "dt-body-center",
              targets: 7,
              render: $.fn.dataTable.render.percentBar(),
            },
          ],
          lengthChange: false,
          autoWidth: true,
          ordering: false,
          searching: false,
          processing: true,
          info: true,
          pagingType: "simple_numbers",
          data: dataSet.data,
        });
        var socket = io.connect("http://47.97.51.98:3002/", {
          transports: ["websocket"],
        });
        socket.on("connect", (data) => {
          socket.emit("connected", "Connected na me");
        });

        socket.on("onUC", async (data) => {
          const response = await fetch(url);
          await response.json().then((data) => {
            table.clear();
            table.rows.add(data.data).draw();
          });
        });
      });
    }
    getData(`http://47.97.51.98:3001/api/data/getDatabyUser?name=${username}`);
  });
};

const getAllTables = (name) => {
  zippedFiles(name);
  unzippedFiles(name);
  processingFiles(name);
  completedFiles(name);
};
