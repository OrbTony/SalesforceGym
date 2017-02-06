function getClassList(success, error) {
  var soql = "SELECT Class__r.Id, Class__r.Name FROM Class_Trainer__c";
  force.query(soql, success, error);
}

function getClassDetails(classId, success, error) {
  var soql = "SELECT Class__r.Name, " +
  "Class__r.Class_Time__c, " +
  "Instuctor__r.First_Name__c, " +
  "Instuctor__r.Last_Name__c " +
  "FROM Class_Trainer__c " +
  "WHERE Class__r.Id = '" + classId + "'";
  force.query(soql, success, error);
}

function showClassList() {
    getClassList(
        function (data) {
            var classes = data.records,
                html = '';
            for (var i=0; i<classes.length; i++) {
                html += '<li class="table-view-cell"><a href="#classes/'+ classes[i].Class__r.Id +'">' + classes[i].Class__r.Name + '</a></li>';
            }
            html =
                '<div class="page">' +
                '<header class="bar bar-nav">' +
                    '<h1 class="title">Classes</h1>' +
                '</header>' +
                '<div class="content">' +
                    '<ul class="table-view class-list">' + html + '</ul>' +
                '</div>' +
                '</div>';
            slider.slidePage($(html));
        },
        function (error) {
            alert("Error: " + JSON.stringify(error));
        });
    return false;
}

function showClassDetails(classId) {

    getClassDetails(classId,
        function (data) {
            var currentClass = data.records[0],
            html =
                '<div class="page">' +
                '<header class="bar bar-nav">' +
                '<a class="btn btn-link btn-nav pull-left" href="#"><span class="icon icon-left-nav"></span>Back</a>' +
            '<h1 class="title">Classes</h1>' +
                '</header>' +
                '<div class="content">' +
                    '<div class="card">' +
                        '<ul class="table-view">' +
                            '<li class="table-view-cell">' +
                                '<h4>' + currentClass.Class__r.Name + '</h4>' +
                                '<p>' + (currentClass.Class__r.Class_Time__c || 'No time yet')+ '</p>' +
                            '</li>' +
                            '<li class="table-view-cell">Trainer: ' +
                                currentClass.Trainer__r.First_Name__c +
                            '</li>' +
                            '<li class="table-view-cell">' +
                                (currentClass.Class__r.Description__c || 'No description yet') +
                            '</li>' +
                        '</ul>' +
                    '</div>' +
                '</div>' +
                '</div>';
            slider.slidePage($(html));
        },
        function (error) {
            alert("Error: " + JSON.stringify(error));
        });
    return false;
}

var slider = new PageSlider($('body')); // Initialize PageSlider micro-library for nice and hardware-accelerated page transitions
router.addRoute('', showClassList);
router.addRoute('Classes/:id', showClassDetails);
