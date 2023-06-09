
// Hiển thị Map
var map = L.map('map').setView([10.007928840491104, 105.72347243847508], 15);
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);
//-------------------------------------------------------------------------------------------------------
// Khoanh vùng danh nghiệp
var circle = L.circle([10.007928840491104, 105.72347243847508], {
    color: 'blue',
    fillColor: '#f03',
    fillOpacity: 0.2,
    radius: 500
}).addTo(map);
//-------------------------------------------------------------------------------------------------------
// Con dấu hình ảnh
var imgMarker = L.icon({
    iconUrl: 'image/imgMarker.jpg',
    iconSize: [70, 70],
});
//-------------------------------------------------------------------------------------------------------
// Đánh dấu doanh nghiệp
var marker = L.marker([10.007928840491104, 105.72347243847508], { icon: imgMarker }).addTo(map);
//-------------------------------------------------------------------------------------------------------
// Thêm thông báo trong đánh dấu
marker.bindPopup("<b>Chào các bạn!</b><br>Đây là trường Đại học Nam Cần Thơ.").openPopup();
//-------------------------------------------------------------------------------------------------------
// Tìm kiếm địa điểm bằng cách nhập địa điểm vào ô input
L.Control.geocoder().addTo(map);
//-------------------------------------------------------------------------------------------------------
// Phóng to bản đồ
var fullScreenView_click = document.getElementById('map');
function fullScreenView() {
    fullScreenView_click.requestFullscreen();
}
//-------------------------------------------------------------------------------------------------------
// Chuyển lớp hiển thị
googleStreets = L.tileLayer('http://{s}.google.com/vt?lyrs=m&x={x}&y={y}&z={z}', {
    maxZoom: 20,
    subdomains: ['mt0', 'mt1', 'mt2', 'mt3']
});
var osm = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '© OpenStreetMap'
});
googleSat = L.tileLayer('http://{s}.google.com/vt?lyrs=s&x={x}&y={y}&z={z}', {
    maxZoom: 20,
    subdomains: ['mt0', 'mt1', 'mt2', 'mt3']
});
googleTerrain = L.tileLayer('http://{s}.google.com/vt?lyrs=p&x={x}&y={y}&z={z}', {
    maxZoom: 20,
    subdomains: ['mt0', 'mt1', 'mt2', 'mt3']
});
googleHybrid = L.tileLayer('http://{s}.google.com/vt?lyrs=s,h&x={x}&y={y}&z={z}', {
    maxZoom: 20,
    subdomains: ['mt0', 'mt1', 'mt2', 'mt3']
});

var baseMaps = {
    "Mặc định": osm,
    "Google map": googleStreets
};

var overlayMaps = {
    "Vệ tinh": googleSat,
    "Địa hình": googleTerrain,
    "Hỗn hợp": googleHybrid,
};
var layerControl = L.control.layers(baseMaps, overlayMaps).addTo(map);
//-------------------------------------------------------------------------------------------------------
// Print Map
$('#btn-print').click(function () {
    window.print();
});
var browserControl = L.control.browserPrint({
    printModes:
        [
            L.BrowserPrint.Mode.Landscape(), L.BrowserPrint.Mode.Portrait()
        ]
}).addTo(map);
// Chỉ đường
// L.Routing.control({
//   waypoints: [
//     L.latLng(10.008376556538536, 105.72430034677888),
//     L.latLng(10.00647861039107, 105.7268944162322)
//   ]
// }).addTo(map);
// Lấy vị trí hiện tại
L.control.locate().addTo(map);
// Chỉ đường theo mô hình doanh nghiệp
// map.on('click', function (e) {
//     var markerSecond = L.marker([e.latlng.lat, e.latlng.lng]).addTo(map);
//     L.Routing.control({
//   waypoints: [
//         L.latLng(10.008376556538536, 105.72430034677888),
//         L.latLng(e.latlng.lat, e.latlng.lng)
//      ]
//     }).addTo(map);
// })
//-------------------------------------------------------------------------------------------------------
// Hiệu ứng điểm chạy trên tuyến đường
map.on('click', function (e) {
    var markerSecond = L.marker([e.latlng.lat, e.latlng.lng]).addTo(map);
    L.Routing.control({
        waypoints: [
            L.latLng(e.latlng.lat, e.latlng.lng),
            L.latLng(10.008376556538536, 105.72430034677888),
        ]
    }).on('routesfound', function (e) {
        e.routes[0].coordinates.forEach(function (toaDo, chiMuc) {
            setTimeout(() => {
                marker.setLatLng([toaDo.lat, toaDo.lng]);
            }, 100 * chiMuc);
        })
    }).addTo(map);
})
//-------------------------------------------------------------------------------------------------------
// Hiển thị tọa đô góc dưới màn hình
L.control.coordinates({
    position: "bottomleft",
    useDMS: true,
    labelTemplateLat: "Vĩ độ {y}",
    labelTemplateLng: "Kinh độ {x}",
    userLatLngOrder: true
}).addTo(map);