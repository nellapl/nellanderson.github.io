var myCmiWindow;
  var statusText;
  var cmiCanvas;
  var toolTip;

  function cmiWindowStart()
  {

    statusText = document.getElementById("StatusText");
    cmiCanvas = document.getElementById("CmiCanvas");
    toolTip = document.getElementById("ToolTippText");
    ResizeWindow();

    myCmiWindow = new CmiWindow("CmiCanvas");
    if(myCmiWindow.isUsable)
    {
      if(myCmiWindow.checkWebGlUsage() < 0)
      {
        SetStatusText(myCmiWindow.getLastError().message);
        return;
      }
      myCmiWindow.setBgColorRGB(255,255,255);
      myCmiWindow.setBgText("INVENTOR");
      if(myCmiWindow.initWebGlWindow() < 0)
      {
        SetStatusText(myCmiWindow.getLastError().message);
        return;
      }

      myCmiWindow.setBackgroundImage("CmiBitmaps/",false);
      myCmiWindow.setNotificationHandler(OnCmiNotification);
      myCmiWindow.handleArrowKeys = false;
      myCmiWindow.loadModelFromUrl("Stub_Axle.wpm");
      myCmiWindow.switchToPerspective(true);
      myCmiWindow.setMouseModeToRotation();
    }
  }

  function SetStatusText(newText)
  {
    statusText.innerHTML = newText;
  }

  function OnCmiNotification (event)
  {
    var txtParts = event.data.split("|");
    if(txtParts[0]=="CMI_ERROR")
    {
      SetStatusText(txtParts[2]);
    }
    else if(txtParts[0]=="CMI_INFO")
    {
      switch(txtParts[1])
      {
        case "ModelLoading":
          SetStatusText(txtParts[2]);
          break;
        case "ModelOpened":
          SetStatusText("");
          break;
        case "ModelDisplayed":
          if ((!myCmiWindow) || (!myCmiWindow.isUsable))
            return;
          myCmiWindow.rotateSceneAbsolut(35,-45,0,false);
          myCmiWindow.zoomAll();
          break;
        case "EntitySelectionHighlight":
          if(toolTip)
          {
            toolTip.style.left = (parseInt(txtParts[2])+10)+"px";
            toolTip.style.top = (parseInt(txtParts[3])-20)+"px";
            toolTip.innerHTML = "&nbsp;" + txtParts[5] +"&nbsp;";
            toolTip.style.display = "block";
            cmiCanvas.style.cursor = "default";
          }
          break;
        case "EntityUrlSelectionHighlight":
          if(toolTip)
          {
            toolTip.style.left = (parseInt(txtParts[2])+10) +"px";
            toolTip.style.top = (parseInt(txtParts[3])-20)+"px";
            toolTip.innerHTML = "&nbsp;" + txtParts[5] +"&nbsp;";
            toolTip.style.display = "block";
            cmiCanvas.style.cursor = "pointer";
          }
          break;
        case "EntitySelectionUnHighlight":
          if(toolTip)
          {
            toolTip.style.display = "none";
            cmiCanvas.style.cursor = "default";
          }
          break;
        case "EntityUrlSelected":
          window.open (txtParts[4],"mywindow");
          break;
      }
    }
  }

  function ResizeWindow()
  {
    var xSize = window.innerWidth;
    var ySize = window.innerHeight;
    var tbHeight = document.getElementById("CmiToolbar").offsetHeight;
    cmiCanvas.width=xSize-15;
    cmiCanvas.height=ySize-tbHeight-45;

    if((myCmiWindow)&&(myCmiWindow.isUsable))
    {
      var canvas = myCmiWindow.getCanvas();
      myCmiWindow.resizeContext(canvas.width,canvas.height);
    }
    statusText.style.top = (parseInt(tbHeight) + 15) + "px";
  }