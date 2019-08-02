<%-- The following 4 lines are ASP.NET directives needed when using SharePoint components --%>

<%@ Page Inherits="Microsoft.SharePoint.WebPartPages.WebPartPage, Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" MasterPageFile="~masterurl/default.master" Language="C#" %>

<%@ Register TagPrefix="Utilities" Namespace="Microsoft.SharePoint.Utilities" Assembly="Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<%@ Register TagPrefix="WebPartPages" Namespace="Microsoft.SharePoint.WebPartPages" Assembly="Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<%@ Register TagPrefix="SharePoint" Namespace="Microsoft.SharePoint.WebControls" Assembly="Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>

<%-- The markup and script in the following Content element will be placed in the <head> of the page --%>
<asp:Content ContentPlaceHolderID="PlaceHolderAdditionalPageHead" runat="server">
    <script type="text/javascript" src="../Scripts/jquery-1.9.1.min.js"></script>
    <SharePoint:ScriptLink Name="sp.js" runat="server" OnDemand="true" LoadAfterUI="true" Localizable="false" />
    <meta name="WebPartPageExpansion" content="full" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />

    <!-- Add your CSS styles to the following file -->
    <link rel="Stylesheet" type="text/css" href="../Content/App.css" />
    <link href="../Content/bootstrap.min.css" rel="stylesheet" />
    <link href="../Content/font-awesome.min.css" rel="stylesheet" />
    <link href="../Content/weather-icons-wind.min.css" rel="stylesheet" />
    <link href="../Content/weather-icons.min.css" rel="stylesheet" />
    <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/meyer-reset/2.0/reset.min.css" />
    <link rel='stylesheet prefetch' type="text/css" href='https://cdnjs.cloudflare.com/ajax/libs/weather-icons/2.0.9/css/weather-icons.min.css' />
    <link rel='stylesheet prefetch' type="text/css" href='https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.5.2/animate.min.css' />

    <!-- Add your JavaScript to the following file -->
    <script type="text/javascript" src="../Scripts/jquery.js"></script>
    <script type="text/javascript" src="../Scripts/App.js"></script>
    <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.6.0/Chart.min.js"></script>
    <script type="text/javascript" src='https://cdnjs.cloudflare.com/ajax/libs/jquery/3.1.0/jquery.min.js'></script>
    <script type="text/javascript" src='https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.15.1/moment.min.js'></script>
    <script type="text/javascript" src="https://momentjs.com/downloads/moment-timezone.min.js"></script>

    <!-- Bootstrap Core JavaScript -->
    <script type="text/javascript" src="../Scripts/bootstrap.min.js"></script>
    <!--chart js-->
    <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.3.0/Chart.bundle.js"></script>

</asp:Content>

<%-- The markup in the following Content element will be placed in the TitleArea of the page --%>
<asp:Content ContentPlaceHolderID="PlaceHolderPageTitleInTitleArea" runat="server">
</asp:Content>

<%-- The markup and script in the following Content element will be placed in the <body> of the page --%>
<asp:Content ContentPlaceHolderID="PlaceHolderMain" runat="server">
                
    <div class="container-fluid banner10">
                    <!-- Weather Forecast -->
        <div id="weather">
            <!--GRAPH col-md-7 city -->
            <div class="row top">
                <div class="col-lg-5 col-md-5 col-sm-12 col-xs-12 top graph">
                    <canvas id="myChart" width="610" height="380"></canvas>
                </div>
                <!-- END-->
                
                <!--Big display at center col-md-5 icon -->
                <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12 top icon">
                    <button id="convertTemp" type="button">
                        Convert &degC/&degF
                    </button>
                    <p style="width: 5px" class="location text-center"></p>
                    <p style="width: 74px; background: darkgray; margin-bottom: -48px;" class="time text-center tímeZero"></p>
                    <p style='color: white' id="month"></p>
                    <span id="year"></span>
                    <br />
                    <p class="iconCurr text-center big"></p>
                    <p class="tempCurr text-center big tempZero"></p>
                    <p class="descCurr text-center descZero" style="margin-top: -164px; font-size: 20px; color: white; font-weight: bold">
                    </p>
                    <p class="uvindexCurr text-center big"></p>
                </div>
            </div>
            
            <hr />
            <div class="weeklyF">Weekly Forecast</div>
            <!--start weekday-->
            <!-- Today weekday 01 col-md-2-->
            <div class="row daily">
                <div class="col-lg-2 col-md-2 col-sm-12.weekly col-xs-12">
                    <p id="currentDay"></p>
                    <p class="currentDate text-uppercase text-center">
                        <span class="day0 text-uppercase text-center"></span>
                        <br />
                        <span class="date0 text-center"></span>
                    </p>
                    <br />
                    <p class="icon0 text-center weekday"></p>
                    <p class="temp0 text-center"></p>
                    <br />
                    <!--Bootstrap list format-->
                    <ul class="list-group">
                        <li class="list-group-item list-group-item-danger tempMax0"></li>
                        <li class="list-group-item list-group-item-warning tempMin0"></li>
                    </ul>
                    <p class="desc0 text-center"></p>
                    <p class="humidity0 text-center"></p>
                    <p class="wind0 text-center"></p>
                    <p class="windDir0 text-center"></p>
                    <p class="pressure0 text-center"></p>
                    <p class="uvindex0 text-center"></p>
                </div>
                <!-- END Today summary-->

                <!-- Weekday 02-->
                <div class="col-lg-2 col-md-2 col-sm-12.weekly col-xs-12">
                    <p class="text-uppercase text-center">
                        <span class="day1 text-uppercase text-center"></span>
                        <br />
                        <span class="date1 text-center"></span>
                    </p>
                    <br />
                    <p class="icon1 icon-upcoming text-center weekday"></p>
                    <p class="temp1 text-center"></p>
                    <br />
                    <!--Bootstrap list format-->
                    <ul class="list-group">
                        <li class="list-group-item list-group-item-danger tempMax1"></li>
                        <li class="list-group-item list-group-item-warning tempMin1"></li>
                    </ul>
                    <p class="desc1 text-center"></p>
                    <p class="humidity1 text-center"></p>
                    <p class="wind1 text-center"></p>
                    <p class="windDir1 text-center"></p>
                    <p class="pressure1 text-center"></p>
                    <p class="uvindex1 text-center"></p>
                </div>
                <!-- END Weekday 02-->

                <!-- Weekday 03-->
                <div class="col-lg-2 col-md-2 col-sm-12.weekly col-xs-12">
                    <p></p>
                    <p class="text-uppercase text-center">
                        <span class="day2 text-center"></span>
                        <br />
                        <span class="date2 text-uppercase text-center"></span>
                    </p>
                    <br />
                    <p class="icon2 icon-upcoming text-center weekday"></p>
                    <p class="temp2 text-center"></p>
                    <br />
                    <!--Bootstrap list format-->
                    <ul class="list-group">
                        <li class="list-group-item list-group-item-danger tempMax2"></li>
                        <li class="list-group-item list-group-item-warning tempMin2"></li>
                    </ul>
                    <p class="desc2 text-center"></p>
                    <p class="hourly text-center"></p>
                    <p class="humidity2 text-center"></p>
                    <p class="precip2 text-center"></p>
                    <p class="wind2 text-center"></p>
                    <p class="windDir2  text-center"></p>
                    <p class="pressure2 text-center"></p>
                    <p class="uvindex2 text-center"></p>
                </div>
                <!-- END Weekday 03-->

                <!-- Weekday 04 -->
                <div class="col-lg-2 col-md-2 col-sm-12.weekly col-xs-12">
                    <p></p>
                    <p class="text-uppercase text-center">
                        <span class="day3 text-center"></span>
                        <br />
                        <span class="date3 text-uppercase text-center"></span>
                    </p>
                    <br />
                    <p class="icon3 icon-upcoming text-center weekday"></p>
                    <p class="temp3 text-center"></p>
                    <br />
                    <!--Bootstrap list format-->
                    <ul class="list-group">
                        <li class="list-group-item list-group-item-danger tempMax3"></li>
                        <li class="list-group-item list-group-item-warning tempMin3"></li>
                    </ul>
                    <p class="desc3 text-center"></p>
                    <p class="humidity3 text-center"></p>
                    <p class="precip3 text-center"></p>
                    <p class="wind3 text-center">
                        <p class="windDir3  text-center"></p>
                        <p class="pressure3 text-center"></p>
                        <p class="uvindex3 text-center"></p>
                </div>
                <!-- END Weekday 04 -->

                <!-- Weekday 05-->
                <div class="col-lg-2 col-md-2 col-sm-12.weekly col-xs-12">
                    <p></p>
                    <p class="text-uppercase text-center">
                        <span class="day4 text-center"></span>
                        <br />
                        <span class="date4 text-uppercase text-center"></span>
                    </p>
                    <br />
                    <p class="icon4 icon-upcoming text-center weekday"></p>
                    <p class="temp4 text-center"></p>
                    <br />
                    <!--Bootstrap list format-->
                    <ul class="list-group">
                        <li class="list-group-item list-group-item-danger tempMax4"></li>
                        <li class="list-group-item list-group-item-warning tempMin4"></li>
                    </ul>
                    <p class="desc4 text-center"></p>
                    <p class="humidity4 text-center"></p>
                    <p class="precip4 text-center"></p>
                    <p class="wind4 text-center"></p>
                    <p class="windDir4 text-center"></p>
                    <p class="pressure4 text-center"></p>
                    <p class="uvindex4 text-center"></p>
                </div>
                <!-- END Weekday 05-->

                <!-- Weekday 06-->
                <div class="col-lg-2 col-md-2 col-sm-12.weekly col-xs-12">
                    <p></p>
                    <p class="text-uppercase text-center"> 
                        <span class="day5 text-center"></span>
                        <br />
                        <span class="date5 text-uppercase text-center"></span>
                    </p>
                    <br />
                    <p class="icon5 icon-upcoming text-center weekday"></p>
                    <p class="temp5 text-center"></p>
                    <br />
                    <!--Bootstrap list format-->
                    <ul class="list-group">
                        <li class="list-group-item list-group-item-danger tempMax5"></li>
                        <li class="list-group-item list-group-item-warning tempMin5"></li>
                    </ul>
                    <p class="desc5 text-center"></p>
                    <p class="humidity5 text-center"></p>
                    <p class="precip5 text-center"></p>
                    <p class="wind5 text-center"></p>
                    <p class="windDir5  text-center"></p>
                    <p class="pressure5 text-center"></p>
                    <p class="uvindex5 text-center"></p>
                </div>
            </div>            
          </div>
        </div>
</asp:Content>
