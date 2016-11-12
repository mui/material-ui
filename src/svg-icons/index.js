'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ToggleStar = exports.ToggleStarHalf = exports.ToggleStarBorder = exports.ToggleRadioButtonUnchecked = exports.ToggleRadioButtonChecked = exports.ToggleIndeterminateCheckBox = exports.ToggleCheckBox = exports.ToggleCheckBoxOutlineBlank = exports.SocialWhatshot = exports.SocialShare = exports.SocialSentimentVerySatisfied = exports.SocialSentimentVeryDissatisfied = exports.SocialSentimentSatisfied = exports.SocialSentimentNeutral = exports.SocialSentimentDissatisfied = exports.SocialSchool = exports.SocialPublic = exports.SocialPoll = exports.SocialPlusOne = exports.SocialPerson = exports.SocialPersonOutline = exports.SocialPersonAdd = exports.SocialPeople = exports.SocialPeopleOutline = exports.SocialPartyMode = exports.SocialPages = exports.SocialNotifications = exports.SocialNotificationsPaused = exports.SocialNotificationsOff = exports.SocialNotificationsNone = exports.SocialNotificationsActive = exports.SocialMood = exports.SocialMoodBad = exports.SocialLocationCity = exports.SocialGroup = exports.SocialGroupAdd = exports.SocialDomain = exports.SocialCake = exports.PlacesSpa = exports.PlacesSmokingRooms = exports.PlacesSmokeFree = exports.PlacesRvHookup = exports.PlacesRoomService = exports.PlacesPool = exports.PlacesKitchen = exports.PlacesHotTub = exports.PlacesGolfCourse = exports.PlacesFreeBreakfast = exports.PlacesFitnessCenter = exports.PlacesChildFriendly = exports.PlacesChildCare = exports.PlacesCasino = exports.PlacesBusinessCenter = exports.PlacesBeachAccess = exports.PlacesAllInclusive = exports.PlacesAirportShuttle = exports.PlacesAcUnit = exports.NotificationWifi = exports.NotificationWc = exports.NotificationVpnLock = exports.NotificationVoiceChat = exports.NotificationVibration = exports.NotificationTimeToLeave = exports.NotificationTapAndPlay = exports.NotificationSystemUpdate = exports.NotificationSync = exports.NotificationSyncProblem = exports.NotificationSyncDisabled = exports.NotificationSms = exports.NotificationSmsFailed = exports.NotificationSimCardAlert = exports.NotificationSdCard = exports.NotificationRvHookup = exports.NotificationPriorityHigh = exports.NotificationPower = exports.NotificationPhonePaused = exports.NotificationPhoneMissed = exports.NotificationPhoneLocked = exports.NotificationPhoneInTalk = exports.NotificationPhoneForwarded = exports.NotificationPhoneBluetoothSpeaker = exports.NotificationPersonalVideo = exports.NotificationOndemandVideo = exports.NotificationNoEncryption = exports.NotificationNetworkLocked = exports.NotificationNetworkCheck = exports.NotificationMore = exports.NotificationMms = exports.NotificationLiveTv = exports.NotificationFolderSpecial = exports.NotificationEventNote = exports.NotificationEventBusy = exports.NotificationEventAvailable = exports.NotificationEnhancedEncryption = exports.NotificationDriveEta = exports.NotificationDoNotDisturb = exports.NotificationDoNotDisturbOn = exports.NotificationDoNotDisturbOff = exports.NotificationDoNotDisturbAlt = exports.NotificationDiscFull = exports.NotificationConfirmationNumber = exports.NotificationBluetoothAudio = exports.NotificationAirlineSeatReclineNormal = exports.NotificationAirlineSeatReclineExtra = exports.NotificationAirlineSeatLegroomReduced = exports.NotificationAirlineSeatLegroomNormal = exports.NotificationAirlineSeatLegroomExtra = exports.NotificationAirlineSeatIndividualSuite = exports.NotificationAirlineSeatFlat = exports.NotificationAirlineSeatFlatAngled = exports.NotificationAdb = exports.NavigationArrowDropRight = exports.NavigationUnfoldMore = exports.NavigationUnfoldLess = exports.NavigationSubdirectoryArrowRight = exports.NavigationSubdirectoryArrowLeft = exports.NavigationRefresh = exports.NavigationMoreVert = exports.NavigationMoreHoriz = exports.NavigationMenu = exports.NavigationLastPage = exports.NavigationFullscreen = exports.NavigationFullscreenExit = exports.NavigationFirstPage = exports.NavigationExpandMore = exports.NavigationExpandLess = exports.NavigationClose = exports.NavigationChevronRight = exports.NavigationChevronLeft = exports.NavigationCheck = exports.NavigationCancel = exports.NavigationArrowUpward = exports.NavigationArrowForward = exports.NavigationArrowDropUp = exports.NavigationArrowDropDown = exports.NavigationArrowDropDownCircle = exports.NavigationArrowDownward = exports.NavigationArrowBack = exports.NavigationApps = exports.MapsZoomOutMap = exports.MapsTransferWithinAStation = exports.MapsTram = exports.MapsTrain = exports.MapsTraffic = exports.MapsTerrain = exports.MapsSubway = exports.MapsStreetview = exports.MapsStoreMallDirectory = exports.MapsSatellite = exports.MapsRestaurant = exports.MapsRestaurantMenu = exports.MapsRateReview = exports.MapsPlace = exports.MapsPinDrop = exports.MapsPersonPin = exports.MapsPersonPinCircle = exports.MapsNearMe = exports.MapsNavigation = exports.MapsMyLocation = exports.MapsMap = exports.MapsLocalTaxi = exports.MapsLocalShipping = exports.MapsLocalSee = exports.MapsLocalPrintshop = exports.MapsLocalPostOffice = exports.MapsLocalPlay = exports.MapsLocalPizza = exports.MapsLocalPhone = exports.MapsLocalPharmacy = exports.MapsLocalParking = exports.MapsLocalOffer = exports.MapsLocalMovies = exports.MapsLocalMall = exports.MapsLocalLibrary = exports.MapsLocalLaundryService = exports.MapsLocalHotel = exports.MapsLocalHospital = exports.MapsLocalGroceryStore = exports.MapsLocalGasStation = exports.MapsLocalFlorist = exports.MapsLocalDrink = exports.MapsLocalDining = exports.MapsLocalConvenienceStore = exports.MapsLocalCarWash = exports.MapsLocalCafe = exports.MapsLocalBar = exports.MapsLocalAtm = exports.MapsLocalAirport = exports.MapsLocalActivity = exports.MapsLayers = exports.MapsLayersClear = exports.MapsHotel = exports.MapsFlight = exports.MapsEvStation = exports.MapsEditLocation = exports.MapsDirections = exports.MapsDirectionsWalk = exports.MapsDirectionsTransit = exports.MapsDirectionsSubway = exports.MapsDirectionsRun = exports.MapsDirectionsRailway = exports.MapsDirectionsCar = exports.MapsDirectionsBus = exports.MapsDirectionsBoat = exports.MapsDirectionsBike = exports.MapsBeenhere = exports.MapsAddLocation = exports.ImageWbSunny = exports.ImageWbIridescent = exports.ImageWbIncandescent = exports.ImageWbCloudy = exports.ImageWbAuto = exports.ImageVignette = exports.ImageViewCompact = exports.ImageViewComfy = exports.ImageTune = exports.ImageTransform = exports.ImageTonality = exports.ImageTimer = exports.ImageTimerOff = exports.ImageTimer3 = exports.ImageTimer10 = exports.ImageTimelapse = exports.ImageTexture = exports.ImageTagFaces = exports.ImageSwitchVideo = exports.ImageSwitchCamera = exports.ImageStyle = exports.ImageStraighten = exports.ImageSlideshow = exports.ImageRotateRight = exports.ImageRotateLeft = exports.ImageRotate90DegreesCcw = exports.ImageRemoveRedEye = exports.ImagePortrait = exports.ImagePictureAsPdf = exports.ImagePhoto = exports.ImagePhotoSizeSelectSmall = exports.ImagePhotoSizeSelectLarge = exports.ImagePhotoSizeSelectActual = exports.ImagePhotoLibrary = exports.ImagePhotoFilter = exports.ImagePhotoCamera = exports.ImagePhotoAlbum = exports.ImagePanorama = exports.ImagePanoramaWideAngle = exports.ImagePanoramaVertical = exports.ImagePanoramaHorizontal = exports.ImagePanoramaFishEye = exports.ImagePalette = exports.ImageNavigateNext = exports.ImageNavigateBefore = exports.ImageNature = exports.ImageNaturePeople = exports.ImageMusicNote = exports.ImageMovieFilter = exports.ImageMovieCreation = exports.ImageMonochromePhotos = exports.ImageLoupe = exports.ImageLooks = exports.ImageLooksTwo = exports.ImageLooksOne = exports.ImageLooks6 = exports.ImageLooks5 = exports.ImageLooks4 = exports.ImageLooks3 = exports.ImageLinkedCamera = exports.ImageLens = exports.ImageLeakRemove = exports.ImageLeakAdd = exports.ImageLandscape = exports.ImageIso = exports.ImageImage = exports.ImageImageAspectRatio = exports.ImageHealing = exports.ImageHdrWeak = exports.ImageHdrStrong = exports.ImageHdrOn = exports.ImageHdrOff = exports.ImageGridOn = exports.ImageGridOff = exports.ImageGrain = exports.ImageGradient = exports.ImageFlip = exports.ImageFlashOn = exports.ImageFlashOff = exports.ImageFlashAuto = exports.ImageFlare = exports.ImageFilter = exports.ImageFilterVintage = exports.ImageFilterTiltShift = exports.ImageFilterNone = exports.ImageFilterHdr = exports.ImageFilterFrames = exports.ImageFilterDrama = exports.ImageFilterCenterFocus = exports.ImageFilterBAndW = exports.ImageFilter9 = exports.ImageFilter9Plus = exports.ImageFilter8 = exports.ImageFilter7 = exports.ImageFilter6 = exports.ImageFilter5 = exports.ImageFilter4 = exports.ImageFilter3 = exports.ImageFilter2 = exports.ImageFilter1 = exports.ImageExposure = exports.ImageExposureZero = exports.ImageExposurePlus2 = exports.ImageExposurePlus1 = exports.ImageExposureNeg2 = exports.ImageExposureNeg1 = exports.ImageEdit = exports.ImageDetails = exports.ImageDehaze = exports.ImageCrop = exports.ImageCropSquare = exports.ImageCropRotate = exports.ImageCropPortrait = exports.ImageCropOriginal = exports.ImageCropLandscape = exports.ImageCropFree = exports.ImageCropDin = exports.ImageCrop75 = exports.ImageCrop54 = exports.ImageCrop32 = exports.ImageCrop169 = exports.ImageControlPoint = exports.ImageControlPointDuplicate = exports.ImageCompare = exports.ImageColorize = exports.ImageColorLens = exports.ImageCollections = exports.ImageCollectionsBookmark = exports.ImageCenterFocusWeak = exports.ImageCenterFocusStrong = exports.ImageCamera = exports.ImageCameraRoll = exports.ImageCameraRear = exports.ImageCameraFront = exports.ImageCameraAlt = exports.ImageBurstMode = exports.ImageBrush = exports.ImageBrokenImage = exports.ImageBrightness7 = exports.ImageBrightness6 = exports.ImageBrightness5 = exports.ImageBrightness4 = exports.ImageBrightness3 = exports.ImageBrightness2 = exports.ImageBrightness1 = exports.ImageBlurOn = exports.ImageBlurOff = exports.ImageBlurLinear = exports.ImageBlurCircular = exports.ImageAudiotrack = exports.ImageAssistant = exports.ImageAssistantPhoto = exports.ImageAdjust = exports.ImageAddToPhotos = exports.ImageAddAPhoto = exports.HardwareWatch = exports.HardwareVideogameAsset = exports.HardwareTv = exports.HardwareToys = exports.HardwareTablet = exports.HardwareTabletMac = exports.HardwareTabletAndroid = exports.HardwareSpeaker = exports.HardwareSpeakerGroup = exports.HardwareSmartphone = exports.HardwareSimCard = exports.HardwareSecurity = exports.HardwareScanner = exports.HardwareRouter = exports.HardwarePowerInput = exports.HardwarePhonelink = exports.HardwarePhonelinkOff = exports.HardwarePhoneIphone = exports.HardwarePhoneAndroid = exports.HardwareMouse = exports.HardwareMemory = exports.HardwareLaptop = exports.HardwareLaptopWindows = exports.HardwareLaptopMac = exports.HardwareLaptopChromebook = exports.HardwareKeyboard = exports.HardwareKeyboardVoice = exports.HardwareKeyboardTab = exports.HardwareKeyboardReturn = exports.HardwareKeyboardHide = exports.HardwareKeyboardCapslock = exports.HardwareKeyboardBackspace = exports.HardwareKeyboardArrowUp = exports.HardwareKeyboardArrowRight = exports.HardwareKeyboardArrowLeft = exports.HardwareKeyboardArrowDown = exports.HardwareHeadset = exports.HardwareHeadsetMic = exports.HardwareGamepad = exports.HardwareDock = exports.HardwareDevicesOther = exports.HardwareDeviceHub = exports.HardwareDeveloperBoard = exports.HardwareDesktopWindows = exports.HardwareDesktopMac = exports.HardwareComputer = exports.HardwareCast = exports.HardwareCastConnected = exports.FileFolder = exports.FileFolderShared = exports.FileFolderOpen = exports.FileFileUpload = exports.FileFileDownload = exports.FileCreateNewFolder = exports.FileCloud = exports.FileCloudUpload = exports.FileCloudQueue = exports.FileCloudOff = exports.FileCloudDownload = exports.FileCloudDone = exports.FileCloudCircle = exports.FileAttachment = exports.EditorWrapText = exports.EditorVerticalAlignTop = exports.EditorVerticalAlignCenter = exports.EditorVerticalAlignBottom = exports.EditorTitle = exports.EditorTextFields = exports.EditorStrikethroughS = exports.EditorSpaceBar = exports.EditorShowChart = exports.EditorShortText = exports.EditorPublish = exports.EditorPieChart = exports.EditorPieChartOutlined = exports.EditorMultilineChart = exports.EditorMoneyOff = exports.EditorMonetizationOn = exports.EditorModeEdit = exports.EditorModeComment = exports.EditorMergeType = exports.EditorLinearScale = exports.EditorInsertPhoto = exports.EditorInsertLink = exports.EditorInsertInvitation = exports.EditorInsertEmoticon = exports.EditorInsertDriveFile = exports.EditorInsertComment = exports.EditorInsertChart = exports.EditorHighlight = exports.EditorFunctions = exports.EditorFormatUnderlined = exports.EditorFormatTextdirectionRToL = exports.EditorFormatTextdirectionLToR = exports.EditorFormatStrikethrough = exports.EditorFormatSize = exports.EditorFormatShapes = exports.EditorFormatQuote = exports.EditorFormatPaint = exports.EditorFormatListNumbered = exports.EditorFormatListBulleted = exports.EditorFormatLineSpacing = exports.EditorFormatItalic = exports.EditorFormatIndentIncrease = exports.EditorFormatIndentDecrease = exports.EditorFormatColorText = exports.EditorFormatColorReset = exports.EditorFormatColorFill = exports.EditorFormatClear = exports.EditorFormatBold = exports.EditorFormatAlignRight = exports.EditorFormatAlignLeft = exports.EditorFormatAlignJustify = exports.EditorFormatAlignCenter = exports.EditorDragHandle = exports.EditorBubbleChart = exports.EditorBorderVertical = exports.EditorBorderTop = exports.EditorBorderStyle = exports.EditorBorderRight = exports.EditorBorderOuter = exports.EditorBorderLeft = exports.EditorBorderInner = exports.EditorBorderHorizontal = exports.EditorBorderColor = exports.EditorBorderClear = exports.EditorBorderBottom = exports.EditorBorderAll = exports.EditorAttachMoney = exports.EditorAttachFile = exports.DeviceWifiTethering = exports.DeviceWifiLock = exports.DeviceWidgets = exports.DeviceWallpaper = exports.DeviceUsb = exports.DeviceStorage = exports.DeviceSignalWifiOff = exports.DeviceSignalWifi4Bar = exports.DeviceSignalWifi4BarLock = exports.DeviceSignalWifi3Bar = exports.DeviceSignalWifi3BarLock = exports.DeviceSignalWifi2Bar = exports.DeviceSignalWifi2BarLock = exports.DeviceSignalWifi1Bar = exports.DeviceSignalWifi1BarLock = exports.DeviceSignalWifi0Bar = exports.DeviceSignalCellularOff = exports.DeviceSignalCellularNull = exports.DeviceSignalCellularNoSim = exports.DeviceSignalCellularConnectedNoInternet4Bar = exports.DeviceSignalCellularConnectedNoInternet3Bar = exports.DeviceSignalCellularConnectedNoInternet2Bar = exports.DeviceSignalCellularConnectedNoInternet1Bar = exports.DeviceSignalCellularConnectedNoInternet0Bar = exports.DeviceSignalCellular4Bar = exports.DeviceSignalCellular3Bar = exports.DeviceSignalCellular2Bar = exports.DeviceSignalCellular1Bar = exports.DeviceSignalCellular0Bar = exports.DeviceSettingsSystemDaydream = exports.DeviceSdStorage = exports.DeviceScreenRotation = exports.DeviceScreenLockRotation = exports.DeviceScreenLockPortrait = exports.DeviceScreenLockLandscape = exports.DeviceNfc = exports.DeviceNetworkWifi = exports.DeviceNetworkCell = exports.DeviceLocationSearching = exports.DeviceLocationDisabled = exports.DeviceGraphicEq = exports.DeviceGpsOff = exports.DeviceGpsNotFixed = exports.DeviceGpsFixed = exports.DeviceDvr = exports.DeviceDevices = exports.DeviceDeveloperMode = exports.DeviceDataUsage = exports.DeviceBrightnessMedium = exports.DeviceBrightnessLow = exports.DeviceBrightnessHigh = exports.DeviceBrightnessAuto = exports.DeviceBluetooth = exports.DeviceBluetoothSearching = exports.DeviceBluetoothDisabled = exports.DeviceBluetoothConnected = exports.DeviceBatteryUnknown = exports.DeviceBatteryStd = exports.DeviceBatteryFull = exports.DeviceBatteryChargingFull = exports.DeviceBatteryCharging90 = exports.DeviceBatteryCharging80 = exports.DeviceBatteryCharging60 = exports.DeviceBatteryCharging50 = exports.DeviceBatteryCharging30 = exports.DeviceBatteryCharging20 = exports.DeviceBatteryAlert = exports.DeviceBattery90 = exports.DeviceBattery80 = exports.DeviceBattery60 = exports.DeviceBattery50 = exports.DeviceBattery30 = exports.DeviceBattery20 = exports.DeviceAirplanemodeInactive = exports.DeviceAirplanemodeActive = exports.DeviceAddAlarm = exports.DeviceAccessTime = exports.DeviceAccessAlarms = exports.DeviceAccessAlarm = exports.ContentWeekend = exports.ContentUndo = exports.ContentUnarchive = exports.ContentTextFormat = exports.ContentSort = exports.ContentSend = exports.ContentSelectAll = exports.ContentSave = exports.ContentReport = exports.ContentReply = exports.ContentReplyAll = exports.ContentRemove = exports.ContentRemoveCircle = exports.ContentRemoveCircleOutline = exports.ContentRedo = exports.ContentNextWeek = exports.ContentMoveToInbox = exports.ContentMarkunread = exports.ContentMail = exports.ContentLowPriority = exports.ContentLink = exports.ContentInbox = exports.ContentGesture = exports.ContentForward = exports.ContentFontDownload = exports.ContentFlag = exports.ContentFilterList = exports.ContentDrafts = exports.ContentDeleteSweep = exports.ContentCreate = exports.ContentContentPaste = exports.ContentContentCut = exports.ContentContentCopy = exports.ContentClear = exports.ContentBlock = exports.ContentBackspace = exports.ContentArchive = exports.ContentAdd = exports.ContentAddCircle = exports.ContentAddCircleOutline = exports.ContentAddBox = exports.CommunicationVpnKey = exports.CommunicationVoicemail = exports.CommunicationTextsms = exports.CommunicationSwapCalls = exports.CommunicationStopScreenShare = exports.CommunicationStayPrimaryPortrait = exports.CommunicationStayPrimaryLandscape = exports.CommunicationStayCurrentPortrait = exports.CommunicationStayCurrentLandscape = exports.CommunicationSpeakerPhone = exports.CommunicationScreenShare = exports.CommunicationRssFeed = exports.CommunicationRingVolume = exports.CommunicationPresentToAll = exports.CommunicationPortableWifiOff = exports.CommunicationPhonelinkSetup = exports.CommunicationPhonelinkRing = exports.CommunicationPhonelinkLock = exports.CommunicationPhonelinkErase = exports.CommunicationPhone = exports.CommunicationNoSim = exports.CommunicationMessage = exports.CommunicationMailOutline = exports.CommunicationLocationOn = exports.CommunicationLocationOff = exports.CommunicationLiveHelp = exports.CommunicationInvertColorsOff = exports.CommunicationImportExport = exports.CommunicationImportContacts = exports.CommunicationForum = exports.CommunicationEmail = exports.CommunicationDialpad = exports.CommunicationDialerSip = exports.CommunicationContacts = exports.CommunicationContactPhone = exports.CommunicationContactMail = exports.CommunicationComment = exports.CommunicationClearAll = exports.CommunicationChat = exports.CommunicationChatBubble = exports.CommunicationChatBubbleOutline = exports.CommunicationCall = exports.CommunicationCallSplit = exports.CommunicationCallReceived = exports.CommunicationCallMissed = exports.CommunicationCallMissedOutgoing = exports.CommunicationCallMerge = exports.CommunicationCallMade = exports.CommunicationCallEnd = exports.CommunicationBusiness = exports.AvWeb = exports.AvWebAsset = exports.AvVolumeUp = exports.AvVolumeOff = exports.AvVolumeMute = exports.AvVolumeDown = exports.AvVideocam = exports.AvVideocamOff = exports.AvVideoLibrary = exports.AvVideoLabel = exports.AvVideoCall = exports.AvSurroundSound = exports.AvSubtitles = exports.AvSubscriptions = exports.AvStop = exports.AvSortByAlpha = exports.AvSnooze = exports.AvSlowMotionVideo = exports.AvSkipPrevious = exports.AvSkipNext = exports.AvShuffle = exports.AvReplay = exports.AvReplay5 = exports.AvReplay30 = exports.AvReplay10 = exports.AvRepeat = exports.AvRepeatOne = exports.AvRemoveFromQueue = exports.AvRecentActors = exports.AvRadio = exports.AvQueue = exports.AvQueuePlayNext = exports.AvQueueMusic = exports.AvPlaylistPlay = exports.AvPlaylistAdd = exports.AvPlaylistAddCheck = exports.AvPlayCircleOutline = exports.AvPlayCircleFilled = exports.AvPlayArrow = exports.AvPause = exports.AvPauseCircleOutline = exports.AvPauseCircleFilled = exports.AvNote = exports.AvNotInterested = exports.AvNewReleases = exports.AvMusicVideo = exports.AvMovie = exports.AvMic = exports.AvMicOff = exports.AvMicNone = exports.AvLoop = exports.AvLibraryMusic = exports.AvLibraryBooks = exports.AvLibraryAdd = exports.AvHighQuality = exports.AvHearing = exports.AvHd = exports.AvGames = exports.AvForward5 = exports.AvForward30 = exports.AvForward10 = exports.AvFiberSmartRecord = exports.AvFiberPin = exports.AvFiberNew = exports.AvFiberManualRecord = exports.AvFiberDvr = exports.AvFeaturedVideo = exports.AvFeaturedPlayList = exports.AvFastRewind = exports.AvFastForward = exports.AvExplicit = exports.AvEqualizer = exports.AvClosedCaption = exports.AvCallToAction = exports.AvBrandingWatermark = exports.AvAvTimer = exports.AvArtTrack = exports.AvAlbum = exports.AvAirplay = exports.AvAddToQueue = exports.AlertWarning = exports.AlertError = exports.AlertErrorOutline = exports.AlertAddAlert = exports.ActionZoomOut = exports.ActionZoomIn = exports.ActionYoutubeSearchedFor = exports.ActionWork = exports.ActionWatchLater = exports.ActionVisibility = exports.ActionVisibilityOff = exports.ActionViewWeek = exports.ActionViewStream = exports.ActionViewQuilt = exports.ActionViewModule = exports.ActionViewList = exports.ActionViewHeadline = exports.ActionViewDay = exports.ActionViewColumn = exports.ActionViewCarousel = exports.ActionViewArray = exports.ActionViewAgenda = exports.ActionVerifiedUser = exports.ActionUpdate = exports.ActionTurnedIn = exports.ActionTurnedInNot = exports.ActionTrendingUp = exports.ActionTrendingFlat = exports.ActionTrendingDown = exports.ActionTranslate = exports.ActionTrackChanges = exports.ActionTouchApp = exports.ActionToll = exports.ActionToday = exports.ActionToc = exports.ActionTimeline = exports.ActionThumbsUpDown = exports.ActionThumbUp = exports.ActionThumbDown = exports.ActionThreeDRotation = exports.ActionTheaters = exports.ActionTab = exports.ActionTabUnselected = exports.ActionSystemUpdateAlt = exports.ActionSwapVerticalCircle = exports.ActionSwapVert = exports.ActionSwapHoriz = exports.ActionSupervisorAccount = exports.ActionSubject = exports.ActionStore = exports.ActionStars = exports.ActionSpellcheck = exports.ActionSpeakerNotes = exports.ActionSpeakerNotesOff = exports.ActionShoppingCart = exports.ActionShoppingBasket = exports.ActionShop = exports.ActionShopTwo = exports.ActionSettings = exports.ActionSettingsVoice = exports.ActionSettingsRemote = exports.ActionSettingsPower = exports.ActionSettingsPhone = exports.ActionSettingsOverscan = exports.ActionSettingsInputSvideo = exports.ActionSettingsInputHdmi = exports.ActionSettingsInputComposite = exports.ActionSettingsInputComponent = exports.ActionSettingsInputAntenna = exports.ActionSettingsEthernet = exports.ActionSettingsCell = exports.ActionSettingsBrightness = exports.ActionSettingsBluetooth = exports.ActionSettingsBackupRestore = exports.ActionSettingsApplications = exports.ActionSearch = exports.ActionSchedule = exports.ActionRowing = exports.ActionRoundedCorner = exports.ActionRoom = exports.ActionRestore = exports.ActionRestorePage = exports.ActionReportProblem = exports.ActionReorder = exports.ActionRemoveShoppingCart = exports.ActionRedeem = exports.ActionRecordVoiceOver = exports.ActionReceipt = exports.ActionQuestionAnswer = exports.ActionQueryBuilder = exports.ActionPrint = exports.ActionPregnantWoman = exports.ActionPowerSettingsNew = exports.ActionPolymer = exports.ActionPlayForWork = exports.ActionPictureInPicture = exports.ActionPictureInPictureAlt = exports.ActionPets = exports.ActionPermScanWifi = exports.ActionPermPhoneMsg = exports.ActionPermMedia = exports.ActionPermIdentity = exports.ActionPermDeviceInformation = exports.ActionPermDataSetting = exports.ActionPermContactCalendar = exports.ActionPermCameraMic = exports.ActionPayment = exports.ActionPanTool = exports.ActionPageview = exports.ActionOpenWith = exports.ActionOpenInNew = exports.ActionOpenInBrowser = exports.ActionOpacity = exports.ActionOfflinePin = exports.ActionNoteAdd = exports.ActionMotorcycle = exports.ActionMarkunreadMailbox = exports.ActionLoyalty = exports.ActionLock = exports.ActionLockOutline = exports.ActionLockOpen = exports.ActionList = exports.ActionLineWeight = exports.ActionLineStyle = exports.ActionLightbulbOutline = exports.ActionLaunch = exports.ActionLanguage = exports.ActionLabel = exports.ActionLabelOutline = exports.ActionInvertColors = exports.ActionInput = exports.ActionInfo = exports.ActionInfoOutline = exports.ActionImportantDevices = exports.ActionHttps = exports.ActionHttp = exports.ActionHourglassFull = exports.ActionHourglassEmpty = exports.ActionHome = exports.ActionHistory = exports.ActionHighlightOff = exports.ActionHelp = exports.ActionHelpOutline = exports.ActionGroupWork = exports.ActionGrade = exports.ActionGif = exports.ActionGetApp = exports.ActionGavel = exports.ActionGTranslate = exports.ActionFlipToFront = exports.ActionFlipToBack = exports.ActionFlightTakeoff = exports.ActionFlightLand = exports.ActionFingerprint = exports.ActionFindReplace = exports.ActionFindInPage = exports.ActionFeedback = exports.ActionFavorite = exports.ActionFavoriteBorder = exports.ActionFace = exports.ActionExtension = exports.ActionExplore = exports.ActionExitToApp = exports.ActionEvent = exports.ActionEventSeat = exports.ActionEuroSymbol = exports.ActionEject = exports.ActionDonutSmall = exports.ActionDonutLarge = exports.ActionDone = exports.ActionDoneAll = exports.ActionDns = exports.ActionDescription = exports.ActionDelete = exports.ActionDeleteForever = exports.ActionDateRange = exports.ActionDashboard = exports.ActionCreditCard = exports.ActionCopyright = exports.ActionCompareArrows = exports.ActionCode = exports.ActionClass = exports.ActionChromeReaderMode = exports.ActionCheckCircle = exports.ActionChangeHistory = exports.ActionCardTravel = exports.ActionCardMembership = exports.ActionCardGiftcard = exports.ActionCameraEnhance = exports.ActionCached = exports.ActionBuild = exports.ActionBugReport = exports.ActionBookmark = exports.ActionBookmarkBorder = exports.ActionBook = exports.ActionBackup = exports.ActionAutorenew = exports.ActionAssignment = exports.ActionAssignmentTurnedIn = exports.ActionAssignmentReturned = exports.ActionAssignmentReturn = exports.ActionAssignmentLate = exports.ActionAssignmentInd = exports.ActionAssessment = exports.ActionAspectRatio = exports.ActionAnnouncement = exports.ActionAndroid = exports.ActionAllOut = exports.ActionAlarm = exports.ActionAlarmOn = exports.ActionAlarmOff = exports.ActionAlarmAdd = exports.ActionAddShoppingCart = exports.ActionAccountCircle = exports.ActionAccountBox = exports.ActionAccountBalance = exports.ActionAccountBalanceWallet = exports.ActionAccessible = exports.ActionAccessibility = undefined;

var _accessibility = require('./action/accessibility');

var _accessibility2 = _interopRequireDefault(_accessibility);

var _accessible = require('./action/accessible');

var _accessible2 = _interopRequireDefault(_accessible);

var _accountBalanceWallet = require('./action/account-balance-wallet');

var _accountBalanceWallet2 = _interopRequireDefault(_accountBalanceWallet);

var _accountBalance = require('./action/account-balance');

var _accountBalance2 = _interopRequireDefault(_accountBalance);

var _accountBox = require('./action/account-box');

var _accountBox2 = _interopRequireDefault(_accountBox);

var _accountCircle = require('./action/account-circle');

var _accountCircle2 = _interopRequireDefault(_accountCircle);

var _addShoppingCart = require('./action/add-shopping-cart');

var _addShoppingCart2 = _interopRequireDefault(_addShoppingCart);

var _alarmAdd = require('./action/alarm-add');

var _alarmAdd2 = _interopRequireDefault(_alarmAdd);

var _alarmOff = require('./action/alarm-off');

var _alarmOff2 = _interopRequireDefault(_alarmOff);

var _alarmOn = require('./action/alarm-on');

var _alarmOn2 = _interopRequireDefault(_alarmOn);

var _alarm = require('./action/alarm');

var _alarm2 = _interopRequireDefault(_alarm);

var _allOut = require('./action/all-out');

var _allOut2 = _interopRequireDefault(_allOut);

var _android = require('./action/android');

var _android2 = _interopRequireDefault(_android);

var _announcement = require('./action/announcement');

var _announcement2 = _interopRequireDefault(_announcement);

var _aspectRatio = require('./action/aspect-ratio');

var _aspectRatio2 = _interopRequireDefault(_aspectRatio);

var _assessment = require('./action/assessment');

var _assessment2 = _interopRequireDefault(_assessment);

var _assignmentInd = require('./action/assignment-ind');

var _assignmentInd2 = _interopRequireDefault(_assignmentInd);

var _assignmentLate = require('./action/assignment-late');

var _assignmentLate2 = _interopRequireDefault(_assignmentLate);

var _assignmentReturn = require('./action/assignment-return');

var _assignmentReturn2 = _interopRequireDefault(_assignmentReturn);

var _assignmentReturned = require('./action/assignment-returned');

var _assignmentReturned2 = _interopRequireDefault(_assignmentReturned);

var _assignmentTurnedIn = require('./action/assignment-turned-in');

var _assignmentTurnedIn2 = _interopRequireDefault(_assignmentTurnedIn);

var _assignment = require('./action/assignment');

var _assignment2 = _interopRequireDefault(_assignment);

var _autorenew = require('./action/autorenew');

var _autorenew2 = _interopRequireDefault(_autorenew);

var _backup = require('./action/backup');

var _backup2 = _interopRequireDefault(_backup);

var _book = require('./action/book');

var _book2 = _interopRequireDefault(_book);

var _bookmarkBorder = require('./action/bookmark-border');

var _bookmarkBorder2 = _interopRequireDefault(_bookmarkBorder);

var _bookmark = require('./action/bookmark');

var _bookmark2 = _interopRequireDefault(_bookmark);

var _bugReport = require('./action/bug-report');

var _bugReport2 = _interopRequireDefault(_bugReport);

var _build = require('./action/build');

var _build2 = _interopRequireDefault(_build);

var _cached = require('./action/cached');

var _cached2 = _interopRequireDefault(_cached);

var _cameraEnhance = require('./action/camera-enhance');

var _cameraEnhance2 = _interopRequireDefault(_cameraEnhance);

var _cardGiftcard = require('./action/card-giftcard');

var _cardGiftcard2 = _interopRequireDefault(_cardGiftcard);

var _cardMembership = require('./action/card-membership');

var _cardMembership2 = _interopRequireDefault(_cardMembership);

var _cardTravel = require('./action/card-travel');

var _cardTravel2 = _interopRequireDefault(_cardTravel);

var _changeHistory = require('./action/change-history');

var _changeHistory2 = _interopRequireDefault(_changeHistory);

var _checkCircle = require('./action/check-circle');

var _checkCircle2 = _interopRequireDefault(_checkCircle);

var _chromeReaderMode = require('./action/chrome-reader-mode');

var _chromeReaderMode2 = _interopRequireDefault(_chromeReaderMode);

var _class = require('./action/class');

var _class2 = _interopRequireDefault(_class);

var _code = require('./action/code');

var _code2 = _interopRequireDefault(_code);

var _compareArrows = require('./action/compare-arrows');

var _compareArrows2 = _interopRequireDefault(_compareArrows);

var _copyright = require('./action/copyright');

var _copyright2 = _interopRequireDefault(_copyright);

var _creditCard = require('./action/credit-card');

var _creditCard2 = _interopRequireDefault(_creditCard);

var _dashboard = require('./action/dashboard');

var _dashboard2 = _interopRequireDefault(_dashboard);

var _dateRange = require('./action/date-range');

var _dateRange2 = _interopRequireDefault(_dateRange);

var _deleteForever = require('./action/delete-forever');

var _deleteForever2 = _interopRequireDefault(_deleteForever);

var _delete = require('./action/delete');

var _delete2 = _interopRequireDefault(_delete);

var _description = require('./action/description');

var _description2 = _interopRequireDefault(_description);

var _dns = require('./action/dns');

var _dns2 = _interopRequireDefault(_dns);

var _doneAll = require('./action/done-all');

var _doneAll2 = _interopRequireDefault(_doneAll);

var _done = require('./action/done');

var _done2 = _interopRequireDefault(_done);

var _donutLarge = require('./action/donut-large');

var _donutLarge2 = _interopRequireDefault(_donutLarge);

var _donutSmall = require('./action/donut-small');

var _donutSmall2 = _interopRequireDefault(_donutSmall);

var _eject = require('./action/eject');

var _eject2 = _interopRequireDefault(_eject);

var _euroSymbol = require('./action/euro-symbol');

var _euroSymbol2 = _interopRequireDefault(_euroSymbol);

var _eventSeat = require('./action/event-seat');

var _eventSeat2 = _interopRequireDefault(_eventSeat);

var _event = require('./action/event');

var _event2 = _interopRequireDefault(_event);

var _exitToApp = require('./action/exit-to-app');

var _exitToApp2 = _interopRequireDefault(_exitToApp);

var _explore = require('./action/explore');

var _explore2 = _interopRequireDefault(_explore);

var _extension = require('./action/extension');

var _extension2 = _interopRequireDefault(_extension);

var _face = require('./action/face');

var _face2 = _interopRequireDefault(_face);

var _favoriteBorder = require('./action/favorite-border');

var _favoriteBorder2 = _interopRequireDefault(_favoriteBorder);

var _favorite = require('./action/favorite');

var _favorite2 = _interopRequireDefault(_favorite);

var _feedback = require('./action/feedback');

var _feedback2 = _interopRequireDefault(_feedback);

var _findInPage = require('./action/find-in-page');

var _findInPage2 = _interopRequireDefault(_findInPage);

var _findReplace = require('./action/find-replace');

var _findReplace2 = _interopRequireDefault(_findReplace);

var _fingerprint = require('./action/fingerprint');

var _fingerprint2 = _interopRequireDefault(_fingerprint);

var _flightLand = require('./action/flight-land');

var _flightLand2 = _interopRequireDefault(_flightLand);

var _flightTakeoff = require('./action/flight-takeoff');

var _flightTakeoff2 = _interopRequireDefault(_flightTakeoff);

var _flipToBack = require('./action/flip-to-back');

var _flipToBack2 = _interopRequireDefault(_flipToBack);

var _flipToFront = require('./action/flip-to-front');

var _flipToFront2 = _interopRequireDefault(_flipToFront);

var _gTranslate = require('./action/g-translate');

var _gTranslate2 = _interopRequireDefault(_gTranslate);

var _gavel = require('./action/gavel');

var _gavel2 = _interopRequireDefault(_gavel);

var _getApp = require('./action/get-app');

var _getApp2 = _interopRequireDefault(_getApp);

var _gif = require('./action/gif');

var _gif2 = _interopRequireDefault(_gif);

var _grade = require('./action/grade');

var _grade2 = _interopRequireDefault(_grade);

var _groupWork = require('./action/group-work');

var _groupWork2 = _interopRequireDefault(_groupWork);

var _helpOutline = require('./action/help-outline');

var _helpOutline2 = _interopRequireDefault(_helpOutline);

var _help = require('./action/help');

var _help2 = _interopRequireDefault(_help);

var _highlightOff = require('./action/highlight-off');

var _highlightOff2 = _interopRequireDefault(_highlightOff);

var _history = require('./action/history');

var _history2 = _interopRequireDefault(_history);

var _home = require('./action/home');

var _home2 = _interopRequireDefault(_home);

var _hourglassEmpty = require('./action/hourglass-empty');

var _hourglassEmpty2 = _interopRequireDefault(_hourglassEmpty);

var _hourglassFull = require('./action/hourglass-full');

var _hourglassFull2 = _interopRequireDefault(_hourglassFull);

var _http = require('./action/http');

var _http2 = _interopRequireDefault(_http);

var _https = require('./action/https');

var _https2 = _interopRequireDefault(_https);

var _importantDevices = require('./action/important-devices');

var _importantDevices2 = _interopRequireDefault(_importantDevices);

var _infoOutline = require('./action/info-outline');

var _infoOutline2 = _interopRequireDefault(_infoOutline);

var _info = require('./action/info');

var _info2 = _interopRequireDefault(_info);

var _input = require('./action/input');

var _input2 = _interopRequireDefault(_input);

var _invertColors = require('./action/invert-colors');

var _invertColors2 = _interopRequireDefault(_invertColors);

var _labelOutline = require('./action/label-outline');

var _labelOutline2 = _interopRequireDefault(_labelOutline);

var _label = require('./action/label');

var _label2 = _interopRequireDefault(_label);

var _language = require('./action/language');

var _language2 = _interopRequireDefault(_language);

var _launch = require('./action/launch');

var _launch2 = _interopRequireDefault(_launch);

var _lightbulbOutline = require('./action/lightbulb-outline');

var _lightbulbOutline2 = _interopRequireDefault(_lightbulbOutline);

var _lineStyle = require('./action/line-style');

var _lineStyle2 = _interopRequireDefault(_lineStyle);

var _lineWeight = require('./action/line-weight');

var _lineWeight2 = _interopRequireDefault(_lineWeight);

var _list = require('./action/list');

var _list2 = _interopRequireDefault(_list);

var _lockOpen = require('./action/lock-open');

var _lockOpen2 = _interopRequireDefault(_lockOpen);

var _lockOutline = require('./action/lock-outline');

var _lockOutline2 = _interopRequireDefault(_lockOutline);

var _lock = require('./action/lock');

var _lock2 = _interopRequireDefault(_lock);

var _loyalty = require('./action/loyalty');

var _loyalty2 = _interopRequireDefault(_loyalty);

var _markunreadMailbox = require('./action/markunread-mailbox');

var _markunreadMailbox2 = _interopRequireDefault(_markunreadMailbox);

var _motorcycle = require('./action/motorcycle');

var _motorcycle2 = _interopRequireDefault(_motorcycle);

var _noteAdd = require('./action/note-add');

var _noteAdd2 = _interopRequireDefault(_noteAdd);

var _offlinePin = require('./action/offline-pin');

var _offlinePin2 = _interopRequireDefault(_offlinePin);

var _opacity = require('./action/opacity');

var _opacity2 = _interopRequireDefault(_opacity);

var _openInBrowser = require('./action/open-in-browser');

var _openInBrowser2 = _interopRequireDefault(_openInBrowser);

var _openInNew = require('./action/open-in-new');

var _openInNew2 = _interopRequireDefault(_openInNew);

var _openWith = require('./action/open-with');

var _openWith2 = _interopRequireDefault(_openWith);

var _pageview = require('./action/pageview');

var _pageview2 = _interopRequireDefault(_pageview);

var _panTool = require('./action/pan-tool');

var _panTool2 = _interopRequireDefault(_panTool);

var _payment = require('./action/payment');

var _payment2 = _interopRequireDefault(_payment);

var _permCameraMic = require('./action/perm-camera-mic');

var _permCameraMic2 = _interopRequireDefault(_permCameraMic);

var _permContactCalendar = require('./action/perm-contact-calendar');

var _permContactCalendar2 = _interopRequireDefault(_permContactCalendar);

var _permDataSetting = require('./action/perm-data-setting');

var _permDataSetting2 = _interopRequireDefault(_permDataSetting);

var _permDeviceInformation = require('./action/perm-device-information');

var _permDeviceInformation2 = _interopRequireDefault(_permDeviceInformation);

var _permIdentity = require('./action/perm-identity');

var _permIdentity2 = _interopRequireDefault(_permIdentity);

var _permMedia = require('./action/perm-media');

var _permMedia2 = _interopRequireDefault(_permMedia);

var _permPhoneMsg = require('./action/perm-phone-msg');

var _permPhoneMsg2 = _interopRequireDefault(_permPhoneMsg);

var _permScanWifi = require('./action/perm-scan-wifi');

var _permScanWifi2 = _interopRequireDefault(_permScanWifi);

var _pets = require('./action/pets');

var _pets2 = _interopRequireDefault(_pets);

var _pictureInPictureAlt = require('./action/picture-in-picture-alt');

var _pictureInPictureAlt2 = _interopRequireDefault(_pictureInPictureAlt);

var _pictureInPicture = require('./action/picture-in-picture');

var _pictureInPicture2 = _interopRequireDefault(_pictureInPicture);

var _playForWork = require('./action/play-for-work');

var _playForWork2 = _interopRequireDefault(_playForWork);

var _polymer = require('./action/polymer');

var _polymer2 = _interopRequireDefault(_polymer);

var _powerSettingsNew = require('./action/power-settings-new');

var _powerSettingsNew2 = _interopRequireDefault(_powerSettingsNew);

var _pregnantWoman = require('./action/pregnant-woman');

var _pregnantWoman2 = _interopRequireDefault(_pregnantWoman);

var _print = require('./action/print');

var _print2 = _interopRequireDefault(_print);

var _queryBuilder = require('./action/query-builder');

var _queryBuilder2 = _interopRequireDefault(_queryBuilder);

var _questionAnswer = require('./action/question-answer');

var _questionAnswer2 = _interopRequireDefault(_questionAnswer);

var _receipt = require('./action/receipt');

var _receipt2 = _interopRequireDefault(_receipt);

var _recordVoiceOver = require('./action/record-voice-over');

var _recordVoiceOver2 = _interopRequireDefault(_recordVoiceOver);

var _redeem = require('./action/redeem');

var _redeem2 = _interopRequireDefault(_redeem);

var _removeShoppingCart = require('./action/remove-shopping-cart');

var _removeShoppingCart2 = _interopRequireDefault(_removeShoppingCart);

var _reorder = require('./action/reorder');

var _reorder2 = _interopRequireDefault(_reorder);

var _reportProblem = require('./action/report-problem');

var _reportProblem2 = _interopRequireDefault(_reportProblem);

var _restorePage = require('./action/restore-page');

var _restorePage2 = _interopRequireDefault(_restorePage);

var _restore = require('./action/restore');

var _restore2 = _interopRequireDefault(_restore);

var _room = require('./action/room');

var _room2 = _interopRequireDefault(_room);

var _roundedCorner = require('./action/rounded-corner');

var _roundedCorner2 = _interopRequireDefault(_roundedCorner);

var _rowing = require('./action/rowing');

var _rowing2 = _interopRequireDefault(_rowing);

var _schedule = require('./action/schedule');

var _schedule2 = _interopRequireDefault(_schedule);

var _search = require('./action/search');

var _search2 = _interopRequireDefault(_search);

var _settingsApplications = require('./action/settings-applications');

var _settingsApplications2 = _interopRequireDefault(_settingsApplications);

var _settingsBackupRestore = require('./action/settings-backup-restore');

var _settingsBackupRestore2 = _interopRequireDefault(_settingsBackupRestore);

var _settingsBluetooth = require('./action/settings-bluetooth');

var _settingsBluetooth2 = _interopRequireDefault(_settingsBluetooth);

var _settingsBrightness = require('./action/settings-brightness');

var _settingsBrightness2 = _interopRequireDefault(_settingsBrightness);

var _settingsCell = require('./action/settings-cell');

var _settingsCell2 = _interopRequireDefault(_settingsCell);

var _settingsEthernet = require('./action/settings-ethernet');

var _settingsEthernet2 = _interopRequireDefault(_settingsEthernet);

var _settingsInputAntenna = require('./action/settings-input-antenna');

var _settingsInputAntenna2 = _interopRequireDefault(_settingsInputAntenna);

var _settingsInputComponent = require('./action/settings-input-component');

var _settingsInputComponent2 = _interopRequireDefault(_settingsInputComponent);

var _settingsInputComposite = require('./action/settings-input-composite');

var _settingsInputComposite2 = _interopRequireDefault(_settingsInputComposite);

var _settingsInputHdmi = require('./action/settings-input-hdmi');

var _settingsInputHdmi2 = _interopRequireDefault(_settingsInputHdmi);

var _settingsInputSvideo = require('./action/settings-input-svideo');

var _settingsInputSvideo2 = _interopRequireDefault(_settingsInputSvideo);

var _settingsOverscan = require('./action/settings-overscan');

var _settingsOverscan2 = _interopRequireDefault(_settingsOverscan);

var _settingsPhone = require('./action/settings-phone');

var _settingsPhone2 = _interopRequireDefault(_settingsPhone);

var _settingsPower = require('./action/settings-power');

var _settingsPower2 = _interopRequireDefault(_settingsPower);

var _settingsRemote = require('./action/settings-remote');

var _settingsRemote2 = _interopRequireDefault(_settingsRemote);

var _settingsVoice = require('./action/settings-voice');

var _settingsVoice2 = _interopRequireDefault(_settingsVoice);

var _settings = require('./action/settings');

var _settings2 = _interopRequireDefault(_settings);

var _shopTwo = require('./action/shop-two');

var _shopTwo2 = _interopRequireDefault(_shopTwo);

var _shop = require('./action/shop');

var _shop2 = _interopRequireDefault(_shop);

var _shoppingBasket = require('./action/shopping-basket');

var _shoppingBasket2 = _interopRequireDefault(_shoppingBasket);

var _shoppingCart = require('./action/shopping-cart');

var _shoppingCart2 = _interopRequireDefault(_shoppingCart);

var _speakerNotesOff = require('./action/speaker-notes-off');

var _speakerNotesOff2 = _interopRequireDefault(_speakerNotesOff);

var _speakerNotes = require('./action/speaker-notes');

var _speakerNotes2 = _interopRequireDefault(_speakerNotes);

var _spellcheck = require('./action/spellcheck');

var _spellcheck2 = _interopRequireDefault(_spellcheck);

var _stars = require('./action/stars');

var _stars2 = _interopRequireDefault(_stars);

var _store = require('./action/store');

var _store2 = _interopRequireDefault(_store);

var _subject = require('./action/subject');

var _subject2 = _interopRequireDefault(_subject);

var _supervisorAccount = require('./action/supervisor-account');

var _supervisorAccount2 = _interopRequireDefault(_supervisorAccount);

var _swapHoriz = require('./action/swap-horiz');

var _swapHoriz2 = _interopRequireDefault(_swapHoriz);

var _swapVert = require('./action/swap-vert');

var _swapVert2 = _interopRequireDefault(_swapVert);

var _swapVerticalCircle = require('./action/swap-vertical-circle');

var _swapVerticalCircle2 = _interopRequireDefault(_swapVerticalCircle);

var _systemUpdateAlt = require('./action/system-update-alt');

var _systemUpdateAlt2 = _interopRequireDefault(_systemUpdateAlt);

var _tabUnselected = require('./action/tab-unselected');

var _tabUnselected2 = _interopRequireDefault(_tabUnselected);

var _tab = require('./action/tab');

var _tab2 = _interopRequireDefault(_tab);

var _theaters = require('./action/theaters');

var _theaters2 = _interopRequireDefault(_theaters);

var _threeDRotation = require('./action/three-d-rotation');

var _threeDRotation2 = _interopRequireDefault(_threeDRotation);

var _thumbDown = require('./action/thumb-down');

var _thumbDown2 = _interopRequireDefault(_thumbDown);

var _thumbUp = require('./action/thumb-up');

var _thumbUp2 = _interopRequireDefault(_thumbUp);

var _thumbsUpDown = require('./action/thumbs-up-down');

var _thumbsUpDown2 = _interopRequireDefault(_thumbsUpDown);

var _timeline = require('./action/timeline');

var _timeline2 = _interopRequireDefault(_timeline);

var _toc = require('./action/toc');

var _toc2 = _interopRequireDefault(_toc);

var _today = require('./action/today');

var _today2 = _interopRequireDefault(_today);

var _toll = require('./action/toll');

var _toll2 = _interopRequireDefault(_toll);

var _touchApp = require('./action/touch-app');

var _touchApp2 = _interopRequireDefault(_touchApp);

var _trackChanges = require('./action/track-changes');

var _trackChanges2 = _interopRequireDefault(_trackChanges);

var _translate = require('./action/translate');

var _translate2 = _interopRequireDefault(_translate);

var _trendingDown = require('./action/trending-down');

var _trendingDown2 = _interopRequireDefault(_trendingDown);

var _trendingFlat = require('./action/trending-flat');

var _trendingFlat2 = _interopRequireDefault(_trendingFlat);

var _trendingUp = require('./action/trending-up');

var _trendingUp2 = _interopRequireDefault(_trendingUp);

var _turnedInNot = require('./action/turned-in-not');

var _turnedInNot2 = _interopRequireDefault(_turnedInNot);

var _turnedIn = require('./action/turned-in');

var _turnedIn2 = _interopRequireDefault(_turnedIn);

var _update = require('./action/update');

var _update2 = _interopRequireDefault(_update);

var _verifiedUser = require('./action/verified-user');

var _verifiedUser2 = _interopRequireDefault(_verifiedUser);

var _viewAgenda = require('./action/view-agenda');

var _viewAgenda2 = _interopRequireDefault(_viewAgenda);

var _viewArray = require('./action/view-array');

var _viewArray2 = _interopRequireDefault(_viewArray);

var _viewCarousel = require('./action/view-carousel');

var _viewCarousel2 = _interopRequireDefault(_viewCarousel);

var _viewColumn = require('./action/view-column');

var _viewColumn2 = _interopRequireDefault(_viewColumn);

var _viewDay = require('./action/view-day');

var _viewDay2 = _interopRequireDefault(_viewDay);

var _viewHeadline = require('./action/view-headline');

var _viewHeadline2 = _interopRequireDefault(_viewHeadline);

var _viewList = require('./action/view-list');

var _viewList2 = _interopRequireDefault(_viewList);

var _viewModule = require('./action/view-module');

var _viewModule2 = _interopRequireDefault(_viewModule);

var _viewQuilt = require('./action/view-quilt');

var _viewQuilt2 = _interopRequireDefault(_viewQuilt);

var _viewStream = require('./action/view-stream');

var _viewStream2 = _interopRequireDefault(_viewStream);

var _viewWeek = require('./action/view-week');

var _viewWeek2 = _interopRequireDefault(_viewWeek);

var _visibilityOff = require('./action/visibility-off');

var _visibilityOff2 = _interopRequireDefault(_visibilityOff);

var _visibility = require('./action/visibility');

var _visibility2 = _interopRequireDefault(_visibility);

var _watchLater = require('./action/watch-later');

var _watchLater2 = _interopRequireDefault(_watchLater);

var _work = require('./action/work');

var _work2 = _interopRequireDefault(_work);

var _youtubeSearchedFor = require('./action/youtube-searched-for');

var _youtubeSearchedFor2 = _interopRequireDefault(_youtubeSearchedFor);

var _zoomIn = require('./action/zoom-in');

var _zoomIn2 = _interopRequireDefault(_zoomIn);

var _zoomOut = require('./action/zoom-out');

var _zoomOut2 = _interopRequireDefault(_zoomOut);

var _addAlert = require('./alert/add-alert');

var _addAlert2 = _interopRequireDefault(_addAlert);

var _errorOutline = require('./alert/error-outline');

var _errorOutline2 = _interopRequireDefault(_errorOutline);

var _error = require('./alert/error');

var _error2 = _interopRequireDefault(_error);

var _warning = require('./alert/warning');

var _warning2 = _interopRequireDefault(_warning);

var _addToQueue = require('./av/add-to-queue');

var _addToQueue2 = _interopRequireDefault(_addToQueue);

var _airplay = require('./av/airplay');

var _airplay2 = _interopRequireDefault(_airplay);

var _album = require('./av/album');

var _album2 = _interopRequireDefault(_album);

var _artTrack = require('./av/art-track');

var _artTrack2 = _interopRequireDefault(_artTrack);

var _avTimer = require('./av/av-timer');

var _avTimer2 = _interopRequireDefault(_avTimer);

var _brandingWatermark = require('./av/branding-watermark');

var _brandingWatermark2 = _interopRequireDefault(_brandingWatermark);

var _callToAction = require('./av/call-to-action');

var _callToAction2 = _interopRequireDefault(_callToAction);

var _closedCaption = require('./av/closed-caption');

var _closedCaption2 = _interopRequireDefault(_closedCaption);

var _equalizer = require('./av/equalizer');

var _equalizer2 = _interopRequireDefault(_equalizer);

var _explicit = require('./av/explicit');

var _explicit2 = _interopRequireDefault(_explicit);

var _fastForward = require('./av/fast-forward');

var _fastForward2 = _interopRequireDefault(_fastForward);

var _fastRewind = require('./av/fast-rewind');

var _fastRewind2 = _interopRequireDefault(_fastRewind);

var _featuredPlayList = require('./av/featured-play-list');

var _featuredPlayList2 = _interopRequireDefault(_featuredPlayList);

var _featuredVideo = require('./av/featured-video');

var _featuredVideo2 = _interopRequireDefault(_featuredVideo);

var _fiberDvr = require('./av/fiber-dvr');

var _fiberDvr2 = _interopRequireDefault(_fiberDvr);

var _fiberManualRecord = require('./av/fiber-manual-record');

var _fiberManualRecord2 = _interopRequireDefault(_fiberManualRecord);

var _fiberNew = require('./av/fiber-new');

var _fiberNew2 = _interopRequireDefault(_fiberNew);

var _fiberPin = require('./av/fiber-pin');

var _fiberPin2 = _interopRequireDefault(_fiberPin);

var _fiberSmartRecord = require('./av/fiber-smart-record');

var _fiberSmartRecord2 = _interopRequireDefault(_fiberSmartRecord);

var _forward = require('./av/forward-10');

var _forward2 = _interopRequireDefault(_forward);

var _forward3 = require('./av/forward-30');

var _forward4 = _interopRequireDefault(_forward3);

var _forward5 = require('./av/forward-5');

var _forward6 = _interopRequireDefault(_forward5);

var _games = require('./av/games');

var _games2 = _interopRequireDefault(_games);

var _hd = require('./av/hd');

var _hd2 = _interopRequireDefault(_hd);

var _hearing = require('./av/hearing');

var _hearing2 = _interopRequireDefault(_hearing);

var _highQuality = require('./av/high-quality');

var _highQuality2 = _interopRequireDefault(_highQuality);

var _libraryAdd = require('./av/library-add');

var _libraryAdd2 = _interopRequireDefault(_libraryAdd);

var _libraryBooks = require('./av/library-books');

var _libraryBooks2 = _interopRequireDefault(_libraryBooks);

var _libraryMusic = require('./av/library-music');

var _libraryMusic2 = _interopRequireDefault(_libraryMusic);

var _loop = require('./av/loop');

var _loop2 = _interopRequireDefault(_loop);

var _micNone = require('./av/mic-none');

var _micNone2 = _interopRequireDefault(_micNone);

var _micOff = require('./av/mic-off');

var _micOff2 = _interopRequireDefault(_micOff);

var _mic = require('./av/mic');

var _mic2 = _interopRequireDefault(_mic);

var _movie = require('./av/movie');

var _movie2 = _interopRequireDefault(_movie);

var _musicVideo = require('./av/music-video');

var _musicVideo2 = _interopRequireDefault(_musicVideo);

var _newReleases = require('./av/new-releases');

var _newReleases2 = _interopRequireDefault(_newReleases);

var _notInterested = require('./av/not-interested');

var _notInterested2 = _interopRequireDefault(_notInterested);

var _note = require('./av/note');

var _note2 = _interopRequireDefault(_note);

var _pauseCircleFilled = require('./av/pause-circle-filled');

var _pauseCircleFilled2 = _interopRequireDefault(_pauseCircleFilled);

var _pauseCircleOutline = require('./av/pause-circle-outline');

var _pauseCircleOutline2 = _interopRequireDefault(_pauseCircleOutline);

var _pause = require('./av/pause');

var _pause2 = _interopRequireDefault(_pause);

var _playArrow = require('./av/play-arrow');

var _playArrow2 = _interopRequireDefault(_playArrow);

var _playCircleFilled = require('./av/play-circle-filled');

var _playCircleFilled2 = _interopRequireDefault(_playCircleFilled);

var _playCircleOutline = require('./av/play-circle-outline');

var _playCircleOutline2 = _interopRequireDefault(_playCircleOutline);

var _playlistAddCheck = require('./av/playlist-add-check');

var _playlistAddCheck2 = _interopRequireDefault(_playlistAddCheck);

var _playlistAdd = require('./av/playlist-add');

var _playlistAdd2 = _interopRequireDefault(_playlistAdd);

var _playlistPlay = require('./av/playlist-play');

var _playlistPlay2 = _interopRequireDefault(_playlistPlay);

var _queueMusic = require('./av/queue-music');

var _queueMusic2 = _interopRequireDefault(_queueMusic);

var _queuePlayNext = require('./av/queue-play-next');

var _queuePlayNext2 = _interopRequireDefault(_queuePlayNext);

var _queue = require('./av/queue');

var _queue2 = _interopRequireDefault(_queue);

var _radio = require('./av/radio');

var _radio2 = _interopRequireDefault(_radio);

var _recentActors = require('./av/recent-actors');

var _recentActors2 = _interopRequireDefault(_recentActors);

var _removeFromQueue = require('./av/remove-from-queue');

var _removeFromQueue2 = _interopRequireDefault(_removeFromQueue);

var _repeatOne = require('./av/repeat-one');

var _repeatOne2 = _interopRequireDefault(_repeatOne);

var _repeat = require('./av/repeat');

var _repeat2 = _interopRequireDefault(_repeat);

var _replay = require('./av/replay-10');

var _replay2 = _interopRequireDefault(_replay);

var _replay3 = require('./av/replay-30');

var _replay4 = _interopRequireDefault(_replay3);

var _replay5 = require('./av/replay-5');

var _replay6 = _interopRequireDefault(_replay5);

var _replay7 = require('./av/replay');

var _replay8 = _interopRequireDefault(_replay7);

var _shuffle = require('./av/shuffle');

var _shuffle2 = _interopRequireDefault(_shuffle);

var _skipNext = require('./av/skip-next');

var _skipNext2 = _interopRequireDefault(_skipNext);

var _skipPrevious = require('./av/skip-previous');

var _skipPrevious2 = _interopRequireDefault(_skipPrevious);

var _slowMotionVideo = require('./av/slow-motion-video');

var _slowMotionVideo2 = _interopRequireDefault(_slowMotionVideo);

var _snooze = require('./av/snooze');

var _snooze2 = _interopRequireDefault(_snooze);

var _sortByAlpha = require('./av/sort-by-alpha');

var _sortByAlpha2 = _interopRequireDefault(_sortByAlpha);

var _stop = require('./av/stop');

var _stop2 = _interopRequireDefault(_stop);

var _subscriptions = require('./av/subscriptions');

var _subscriptions2 = _interopRequireDefault(_subscriptions);

var _subtitles = require('./av/subtitles');

var _subtitles2 = _interopRequireDefault(_subtitles);

var _surroundSound = require('./av/surround-sound');

var _surroundSound2 = _interopRequireDefault(_surroundSound);

var _videoCall = require('./av/video-call');

var _videoCall2 = _interopRequireDefault(_videoCall);

var _videoLabel = require('./av/video-label');

var _videoLabel2 = _interopRequireDefault(_videoLabel);

var _videoLibrary = require('./av/video-library');

var _videoLibrary2 = _interopRequireDefault(_videoLibrary);

var _videocamOff = require('./av/videocam-off');

var _videocamOff2 = _interopRequireDefault(_videocamOff);

var _videocam = require('./av/videocam');

var _videocam2 = _interopRequireDefault(_videocam);

var _volumeDown = require('./av/volume-down');

var _volumeDown2 = _interopRequireDefault(_volumeDown);

var _volumeMute = require('./av/volume-mute');

var _volumeMute2 = _interopRequireDefault(_volumeMute);

var _volumeOff = require('./av/volume-off');

var _volumeOff2 = _interopRequireDefault(_volumeOff);

var _volumeUp = require('./av/volume-up');

var _volumeUp2 = _interopRequireDefault(_volumeUp);

var _webAsset = require('./av/web-asset');

var _webAsset2 = _interopRequireDefault(_webAsset);

var _web = require('./av/web');

var _web2 = _interopRequireDefault(_web);

var _business = require('./communication/business');

var _business2 = _interopRequireDefault(_business);

var _callEnd = require('./communication/call-end');

var _callEnd2 = _interopRequireDefault(_callEnd);

var _callMade = require('./communication/call-made');

var _callMade2 = _interopRequireDefault(_callMade);

var _callMerge = require('./communication/call-merge');

var _callMerge2 = _interopRequireDefault(_callMerge);

var _callMissedOutgoing = require('./communication/call-missed-outgoing');

var _callMissedOutgoing2 = _interopRequireDefault(_callMissedOutgoing);

var _callMissed = require('./communication/call-missed');

var _callMissed2 = _interopRequireDefault(_callMissed);

var _callReceived = require('./communication/call-received');

var _callReceived2 = _interopRequireDefault(_callReceived);

var _callSplit = require('./communication/call-split');

var _callSplit2 = _interopRequireDefault(_callSplit);

var _call = require('./communication/call');

var _call2 = _interopRequireDefault(_call);

var _chatBubbleOutline = require('./communication/chat-bubble-outline');

var _chatBubbleOutline2 = _interopRequireDefault(_chatBubbleOutline);

var _chatBubble = require('./communication/chat-bubble');

var _chatBubble2 = _interopRequireDefault(_chatBubble);

var _chat = require('./communication/chat');

var _chat2 = _interopRequireDefault(_chat);

var _clearAll = require('./communication/clear-all');

var _clearAll2 = _interopRequireDefault(_clearAll);

var _comment = require('./communication/comment');

var _comment2 = _interopRequireDefault(_comment);

var _contactMail = require('./communication/contact-mail');

var _contactMail2 = _interopRequireDefault(_contactMail);

var _contactPhone = require('./communication/contact-phone');

var _contactPhone2 = _interopRequireDefault(_contactPhone);

var _contacts = require('./communication/contacts');

var _contacts2 = _interopRequireDefault(_contacts);

var _dialerSip = require('./communication/dialer-sip');

var _dialerSip2 = _interopRequireDefault(_dialerSip);

var _dialpad = require('./communication/dialpad');

var _dialpad2 = _interopRequireDefault(_dialpad);

var _email = require('./communication/email');

var _email2 = _interopRequireDefault(_email);

var _forum = require('./communication/forum');

var _forum2 = _interopRequireDefault(_forum);

var _importContacts = require('./communication/import-contacts');

var _importContacts2 = _interopRequireDefault(_importContacts);

var _importExport = require('./communication/import-export');

var _importExport2 = _interopRequireDefault(_importExport);

var _invertColorsOff = require('./communication/invert-colors-off');

var _invertColorsOff2 = _interopRequireDefault(_invertColorsOff);

var _liveHelp = require('./communication/live-help');

var _liveHelp2 = _interopRequireDefault(_liveHelp);

var _locationOff = require('./communication/location-off');

var _locationOff2 = _interopRequireDefault(_locationOff);

var _locationOn = require('./communication/location-on');

var _locationOn2 = _interopRequireDefault(_locationOn);

var _mailOutline = require('./communication/mail-outline');

var _mailOutline2 = _interopRequireDefault(_mailOutline);

var _message = require('./communication/message');

var _message2 = _interopRequireDefault(_message);

var _noSim = require('./communication/no-sim');

var _noSim2 = _interopRequireDefault(_noSim);

var _phone = require('./communication/phone');

var _phone2 = _interopRequireDefault(_phone);

var _phonelinkErase = require('./communication/phonelink-erase');

var _phonelinkErase2 = _interopRequireDefault(_phonelinkErase);

var _phonelinkLock = require('./communication/phonelink-lock');

var _phonelinkLock2 = _interopRequireDefault(_phonelinkLock);

var _phonelinkRing = require('./communication/phonelink-ring');

var _phonelinkRing2 = _interopRequireDefault(_phonelinkRing);

var _phonelinkSetup = require('./communication/phonelink-setup');

var _phonelinkSetup2 = _interopRequireDefault(_phonelinkSetup);

var _portableWifiOff = require('./communication/portable-wifi-off');

var _portableWifiOff2 = _interopRequireDefault(_portableWifiOff);

var _presentToAll = require('./communication/present-to-all');

var _presentToAll2 = _interopRequireDefault(_presentToAll);

var _ringVolume = require('./communication/ring-volume');

var _ringVolume2 = _interopRequireDefault(_ringVolume);

var _rssFeed = require('./communication/rss-feed');

var _rssFeed2 = _interopRequireDefault(_rssFeed);

var _screenShare = require('./communication/screen-share');

var _screenShare2 = _interopRequireDefault(_screenShare);

var _speakerPhone = require('./communication/speaker-phone');

var _speakerPhone2 = _interopRequireDefault(_speakerPhone);

var _stayCurrentLandscape = require('./communication/stay-current-landscape');

var _stayCurrentLandscape2 = _interopRequireDefault(_stayCurrentLandscape);

var _stayCurrentPortrait = require('./communication/stay-current-portrait');

var _stayCurrentPortrait2 = _interopRequireDefault(_stayCurrentPortrait);

var _stayPrimaryLandscape = require('./communication/stay-primary-landscape');

var _stayPrimaryLandscape2 = _interopRequireDefault(_stayPrimaryLandscape);

var _stayPrimaryPortrait = require('./communication/stay-primary-portrait');

var _stayPrimaryPortrait2 = _interopRequireDefault(_stayPrimaryPortrait);

var _stopScreenShare = require('./communication/stop-screen-share');

var _stopScreenShare2 = _interopRequireDefault(_stopScreenShare);

var _swapCalls = require('./communication/swap-calls');

var _swapCalls2 = _interopRequireDefault(_swapCalls);

var _textsms = require('./communication/textsms');

var _textsms2 = _interopRequireDefault(_textsms);

var _voicemail = require('./communication/voicemail');

var _voicemail2 = _interopRequireDefault(_voicemail);

var _vpnKey = require('./communication/vpn-key');

var _vpnKey2 = _interopRequireDefault(_vpnKey);

var _addBox = require('./content/add-box');

var _addBox2 = _interopRequireDefault(_addBox);

var _addCircleOutline = require('./content/add-circle-outline');

var _addCircleOutline2 = _interopRequireDefault(_addCircleOutline);

var _addCircle = require('./content/add-circle');

var _addCircle2 = _interopRequireDefault(_addCircle);

var _add = require('./content/add');

var _add2 = _interopRequireDefault(_add);

var _archive = require('./content/archive');

var _archive2 = _interopRequireDefault(_archive);

var _backspace = require('./content/backspace');

var _backspace2 = _interopRequireDefault(_backspace);

var _block = require('./content/block');

var _block2 = _interopRequireDefault(_block);

var _clear = require('./content/clear');

var _clear2 = _interopRequireDefault(_clear);

var _contentCopy = require('./content/content-copy');

var _contentCopy2 = _interopRequireDefault(_contentCopy);

var _contentCut = require('./content/content-cut');

var _contentCut2 = _interopRequireDefault(_contentCut);

var _contentPaste = require('./content/content-paste');

var _contentPaste2 = _interopRequireDefault(_contentPaste);

var _create = require('./content/create');

var _create2 = _interopRequireDefault(_create);

var _deleteSweep = require('./content/delete-sweep');

var _deleteSweep2 = _interopRequireDefault(_deleteSweep);

var _drafts = require('./content/drafts');

var _drafts2 = _interopRequireDefault(_drafts);

var _filterList = require('./content/filter-list');

var _filterList2 = _interopRequireDefault(_filterList);

var _flag = require('./content/flag');

var _flag2 = _interopRequireDefault(_flag);

var _fontDownload = require('./content/font-download');

var _fontDownload2 = _interopRequireDefault(_fontDownload);

var _forward7 = require('./content/forward');

var _forward8 = _interopRequireDefault(_forward7);

var _gesture = require('./content/gesture');

var _gesture2 = _interopRequireDefault(_gesture);

var _inbox = require('./content/inbox');

var _inbox2 = _interopRequireDefault(_inbox);

var _link = require('./content/link');

var _link2 = _interopRequireDefault(_link);

var _lowPriority = require('./content/low-priority');

var _lowPriority2 = _interopRequireDefault(_lowPriority);

var _mail = require('./content/mail');

var _mail2 = _interopRequireDefault(_mail);

var _markunread = require('./content/markunread');

var _markunread2 = _interopRequireDefault(_markunread);

var _moveToInbox = require('./content/move-to-inbox');

var _moveToInbox2 = _interopRequireDefault(_moveToInbox);

var _nextWeek = require('./content/next-week');

var _nextWeek2 = _interopRequireDefault(_nextWeek);

var _redo = require('./content/redo');

var _redo2 = _interopRequireDefault(_redo);

var _removeCircleOutline = require('./content/remove-circle-outline');

var _removeCircleOutline2 = _interopRequireDefault(_removeCircleOutline);

var _removeCircle = require('./content/remove-circle');

var _removeCircle2 = _interopRequireDefault(_removeCircle);

var _remove = require('./content/remove');

var _remove2 = _interopRequireDefault(_remove);

var _replyAll = require('./content/reply-all');

var _replyAll2 = _interopRequireDefault(_replyAll);

var _reply = require('./content/reply');

var _reply2 = _interopRequireDefault(_reply);

var _report = require('./content/report');

var _report2 = _interopRequireDefault(_report);

var _save = require('./content/save');

var _save2 = _interopRequireDefault(_save);

var _selectAll = require('./content/select-all');

var _selectAll2 = _interopRequireDefault(_selectAll);

var _send = require('./content/send');

var _send2 = _interopRequireDefault(_send);

var _sort = require('./content/sort');

var _sort2 = _interopRequireDefault(_sort);

var _textFormat = require('./content/text-format');

var _textFormat2 = _interopRequireDefault(_textFormat);

var _unarchive = require('./content/unarchive');

var _unarchive2 = _interopRequireDefault(_unarchive);

var _undo = require('./content/undo');

var _undo2 = _interopRequireDefault(_undo);

var _weekend = require('./content/weekend');

var _weekend2 = _interopRequireDefault(_weekend);

var _accessAlarm = require('./device/access-alarm');

var _accessAlarm2 = _interopRequireDefault(_accessAlarm);

var _accessAlarms = require('./device/access-alarms');

var _accessAlarms2 = _interopRequireDefault(_accessAlarms);

var _accessTime = require('./device/access-time');

var _accessTime2 = _interopRequireDefault(_accessTime);

var _addAlarm = require('./device/add-alarm');

var _addAlarm2 = _interopRequireDefault(_addAlarm);

var _airplanemodeActive = require('./device/airplanemode-active');

var _airplanemodeActive2 = _interopRequireDefault(_airplanemodeActive);

var _airplanemodeInactive = require('./device/airplanemode-inactive');

var _airplanemodeInactive2 = _interopRequireDefault(_airplanemodeInactive);

var _battery = require('./device/battery-20');

var _battery2 = _interopRequireDefault(_battery);

var _battery3 = require('./device/battery-30');

var _battery4 = _interopRequireDefault(_battery3);

var _battery5 = require('./device/battery-50');

var _battery6 = _interopRequireDefault(_battery5);

var _battery7 = require('./device/battery-60');

var _battery8 = _interopRequireDefault(_battery7);

var _battery9 = require('./device/battery-80');

var _battery10 = _interopRequireDefault(_battery9);

var _battery11 = require('./device/battery-90');

var _battery12 = _interopRequireDefault(_battery11);

var _batteryAlert = require('./device/battery-alert');

var _batteryAlert2 = _interopRequireDefault(_batteryAlert);

var _batteryCharging = require('./device/battery-charging-20');

var _batteryCharging2 = _interopRequireDefault(_batteryCharging);

var _batteryCharging3 = require('./device/battery-charging-30');

var _batteryCharging4 = _interopRequireDefault(_batteryCharging3);

var _batteryCharging5 = require('./device/battery-charging-50');

var _batteryCharging6 = _interopRequireDefault(_batteryCharging5);

var _batteryCharging7 = require('./device/battery-charging-60');

var _batteryCharging8 = _interopRequireDefault(_batteryCharging7);

var _batteryCharging9 = require('./device/battery-charging-80');

var _batteryCharging10 = _interopRequireDefault(_batteryCharging9);

var _batteryCharging11 = require('./device/battery-charging-90');

var _batteryCharging12 = _interopRequireDefault(_batteryCharging11);

var _batteryChargingFull = require('./device/battery-charging-full');

var _batteryChargingFull2 = _interopRequireDefault(_batteryChargingFull);

var _batteryFull = require('./device/battery-full');

var _batteryFull2 = _interopRequireDefault(_batteryFull);

var _batteryStd = require('./device/battery-std');

var _batteryStd2 = _interopRequireDefault(_batteryStd);

var _batteryUnknown = require('./device/battery-unknown');

var _batteryUnknown2 = _interopRequireDefault(_batteryUnknown);

var _bluetoothConnected = require('./device/bluetooth-connected');

var _bluetoothConnected2 = _interopRequireDefault(_bluetoothConnected);

var _bluetoothDisabled = require('./device/bluetooth-disabled');

var _bluetoothDisabled2 = _interopRequireDefault(_bluetoothDisabled);

var _bluetoothSearching = require('./device/bluetooth-searching');

var _bluetoothSearching2 = _interopRequireDefault(_bluetoothSearching);

var _bluetooth = require('./device/bluetooth');

var _bluetooth2 = _interopRequireDefault(_bluetooth);

var _brightnessAuto = require('./device/brightness-auto');

var _brightnessAuto2 = _interopRequireDefault(_brightnessAuto);

var _brightnessHigh = require('./device/brightness-high');

var _brightnessHigh2 = _interopRequireDefault(_brightnessHigh);

var _brightnessLow = require('./device/brightness-low');

var _brightnessLow2 = _interopRequireDefault(_brightnessLow);

var _brightnessMedium = require('./device/brightness-medium');

var _brightnessMedium2 = _interopRequireDefault(_brightnessMedium);

var _dataUsage = require('./device/data-usage');

var _dataUsage2 = _interopRequireDefault(_dataUsage);

var _developerMode = require('./device/developer-mode');

var _developerMode2 = _interopRequireDefault(_developerMode);

var _devices = require('./device/devices');

var _devices2 = _interopRequireDefault(_devices);

var _dvr = require('./device/dvr');

var _dvr2 = _interopRequireDefault(_dvr);

var _gpsFixed = require('./device/gps-fixed');

var _gpsFixed2 = _interopRequireDefault(_gpsFixed);

var _gpsNotFixed = require('./device/gps-not-fixed');

var _gpsNotFixed2 = _interopRequireDefault(_gpsNotFixed);

var _gpsOff = require('./device/gps-off');

var _gpsOff2 = _interopRequireDefault(_gpsOff);

var _graphicEq = require('./device/graphic-eq');

var _graphicEq2 = _interopRequireDefault(_graphicEq);

var _locationDisabled = require('./device/location-disabled');

var _locationDisabled2 = _interopRequireDefault(_locationDisabled);

var _locationSearching = require('./device/location-searching');

var _locationSearching2 = _interopRequireDefault(_locationSearching);

var _networkCell = require('./device/network-cell');

var _networkCell2 = _interopRequireDefault(_networkCell);

var _networkWifi = require('./device/network-wifi');

var _networkWifi2 = _interopRequireDefault(_networkWifi);

var _nfc = require('./device/nfc');

var _nfc2 = _interopRequireDefault(_nfc);

var _screenLockLandscape = require('./device/screen-lock-landscape');

var _screenLockLandscape2 = _interopRequireDefault(_screenLockLandscape);

var _screenLockPortrait = require('./device/screen-lock-portrait');

var _screenLockPortrait2 = _interopRequireDefault(_screenLockPortrait);

var _screenLockRotation = require('./device/screen-lock-rotation');

var _screenLockRotation2 = _interopRequireDefault(_screenLockRotation);

var _screenRotation = require('./device/screen-rotation');

var _screenRotation2 = _interopRequireDefault(_screenRotation);

var _sdStorage = require('./device/sd-storage');

var _sdStorage2 = _interopRequireDefault(_sdStorage);

var _settingsSystemDaydream = require('./device/settings-system-daydream');

var _settingsSystemDaydream2 = _interopRequireDefault(_settingsSystemDaydream);

var _signalCellular0Bar = require('./device/signal-cellular-0-bar');

var _signalCellular0Bar2 = _interopRequireDefault(_signalCellular0Bar);

var _signalCellular1Bar = require('./device/signal-cellular-1-bar');

var _signalCellular1Bar2 = _interopRequireDefault(_signalCellular1Bar);

var _signalCellular2Bar = require('./device/signal-cellular-2-bar');

var _signalCellular2Bar2 = _interopRequireDefault(_signalCellular2Bar);

var _signalCellular3Bar = require('./device/signal-cellular-3-bar');

var _signalCellular3Bar2 = _interopRequireDefault(_signalCellular3Bar);

var _signalCellular4Bar = require('./device/signal-cellular-4-bar');

var _signalCellular4Bar2 = _interopRequireDefault(_signalCellular4Bar);

var _signalCellularConnectedNoInternet0Bar = require('./device/signal-cellular-connected-no-internet-0-bar');

var _signalCellularConnectedNoInternet0Bar2 = _interopRequireDefault(_signalCellularConnectedNoInternet0Bar);

var _signalCellularConnectedNoInternet1Bar = require('./device/signal-cellular-connected-no-internet-1-bar');

var _signalCellularConnectedNoInternet1Bar2 = _interopRequireDefault(_signalCellularConnectedNoInternet1Bar);

var _signalCellularConnectedNoInternet2Bar = require('./device/signal-cellular-connected-no-internet-2-bar');

var _signalCellularConnectedNoInternet2Bar2 = _interopRequireDefault(_signalCellularConnectedNoInternet2Bar);

var _signalCellularConnectedNoInternet3Bar = require('./device/signal-cellular-connected-no-internet-3-bar');

var _signalCellularConnectedNoInternet3Bar2 = _interopRequireDefault(_signalCellularConnectedNoInternet3Bar);

var _signalCellularConnectedNoInternet4Bar = require('./device/signal-cellular-connected-no-internet-4-bar');

var _signalCellularConnectedNoInternet4Bar2 = _interopRequireDefault(_signalCellularConnectedNoInternet4Bar);

var _signalCellularNoSim = require('./device/signal-cellular-no-sim');

var _signalCellularNoSim2 = _interopRequireDefault(_signalCellularNoSim);

var _signalCellularNull = require('./device/signal-cellular-null');

var _signalCellularNull2 = _interopRequireDefault(_signalCellularNull);

var _signalCellularOff = require('./device/signal-cellular-off');

var _signalCellularOff2 = _interopRequireDefault(_signalCellularOff);

var _signalWifi0Bar = require('./device/signal-wifi-0-bar');

var _signalWifi0Bar2 = _interopRequireDefault(_signalWifi0Bar);

var _signalWifi1BarLock = require('./device/signal-wifi-1-bar-lock');

var _signalWifi1BarLock2 = _interopRequireDefault(_signalWifi1BarLock);

var _signalWifi1Bar = require('./device/signal-wifi-1-bar');

var _signalWifi1Bar2 = _interopRequireDefault(_signalWifi1Bar);

var _signalWifi2BarLock = require('./device/signal-wifi-2-bar-lock');

var _signalWifi2BarLock2 = _interopRequireDefault(_signalWifi2BarLock);

var _signalWifi2Bar = require('./device/signal-wifi-2-bar');

var _signalWifi2Bar2 = _interopRequireDefault(_signalWifi2Bar);

var _signalWifi3BarLock = require('./device/signal-wifi-3-bar-lock');

var _signalWifi3BarLock2 = _interopRequireDefault(_signalWifi3BarLock);

var _signalWifi3Bar = require('./device/signal-wifi-3-bar');

var _signalWifi3Bar2 = _interopRequireDefault(_signalWifi3Bar);

var _signalWifi4BarLock = require('./device/signal-wifi-4-bar-lock');

var _signalWifi4BarLock2 = _interopRequireDefault(_signalWifi4BarLock);

var _signalWifi4Bar = require('./device/signal-wifi-4-bar');

var _signalWifi4Bar2 = _interopRequireDefault(_signalWifi4Bar);

var _signalWifiOff = require('./device/signal-wifi-off');

var _signalWifiOff2 = _interopRequireDefault(_signalWifiOff);

var _storage = require('./device/storage');

var _storage2 = _interopRequireDefault(_storage);

var _usb = require('./device/usb');

var _usb2 = _interopRequireDefault(_usb);

var _wallpaper = require('./device/wallpaper');

var _wallpaper2 = _interopRequireDefault(_wallpaper);

var _widgets = require('./device/widgets');

var _widgets2 = _interopRequireDefault(_widgets);

var _wifiLock = require('./device/wifi-lock');

var _wifiLock2 = _interopRequireDefault(_wifiLock);

var _wifiTethering = require('./device/wifi-tethering');

var _wifiTethering2 = _interopRequireDefault(_wifiTethering);

var _attachFile = require('./editor/attach-file');

var _attachFile2 = _interopRequireDefault(_attachFile);

var _attachMoney = require('./editor/attach-money');

var _attachMoney2 = _interopRequireDefault(_attachMoney);

var _borderAll = require('./editor/border-all');

var _borderAll2 = _interopRequireDefault(_borderAll);

var _borderBottom = require('./editor/border-bottom');

var _borderBottom2 = _interopRequireDefault(_borderBottom);

var _borderClear = require('./editor/border-clear');

var _borderClear2 = _interopRequireDefault(_borderClear);

var _borderColor = require('./editor/border-color');

var _borderColor2 = _interopRequireDefault(_borderColor);

var _borderHorizontal = require('./editor/border-horizontal');

var _borderHorizontal2 = _interopRequireDefault(_borderHorizontal);

var _borderInner = require('./editor/border-inner');

var _borderInner2 = _interopRequireDefault(_borderInner);

var _borderLeft = require('./editor/border-left');

var _borderLeft2 = _interopRequireDefault(_borderLeft);

var _borderOuter = require('./editor/border-outer');

var _borderOuter2 = _interopRequireDefault(_borderOuter);

var _borderRight = require('./editor/border-right');

var _borderRight2 = _interopRequireDefault(_borderRight);

var _borderStyle = require('./editor/border-style');

var _borderStyle2 = _interopRequireDefault(_borderStyle);

var _borderTop = require('./editor/border-top');

var _borderTop2 = _interopRequireDefault(_borderTop);

var _borderVertical = require('./editor/border-vertical');

var _borderVertical2 = _interopRequireDefault(_borderVertical);

var _bubbleChart = require('./editor/bubble-chart');

var _bubbleChart2 = _interopRequireDefault(_bubbleChart);

var _dragHandle = require('./editor/drag-handle');

var _dragHandle2 = _interopRequireDefault(_dragHandle);

var _formatAlignCenter = require('./editor/format-align-center');

var _formatAlignCenter2 = _interopRequireDefault(_formatAlignCenter);

var _formatAlignJustify = require('./editor/format-align-justify');

var _formatAlignJustify2 = _interopRequireDefault(_formatAlignJustify);

var _formatAlignLeft = require('./editor/format-align-left');

var _formatAlignLeft2 = _interopRequireDefault(_formatAlignLeft);

var _formatAlignRight = require('./editor/format-align-right');

var _formatAlignRight2 = _interopRequireDefault(_formatAlignRight);

var _formatBold = require('./editor/format-bold');

var _formatBold2 = _interopRequireDefault(_formatBold);

var _formatClear = require('./editor/format-clear');

var _formatClear2 = _interopRequireDefault(_formatClear);

var _formatColorFill = require('./editor/format-color-fill');

var _formatColorFill2 = _interopRequireDefault(_formatColorFill);

var _formatColorReset = require('./editor/format-color-reset');

var _formatColorReset2 = _interopRequireDefault(_formatColorReset);

var _formatColorText = require('./editor/format-color-text');

var _formatColorText2 = _interopRequireDefault(_formatColorText);

var _formatIndentDecrease = require('./editor/format-indent-decrease');

var _formatIndentDecrease2 = _interopRequireDefault(_formatIndentDecrease);

var _formatIndentIncrease = require('./editor/format-indent-increase');

var _formatIndentIncrease2 = _interopRequireDefault(_formatIndentIncrease);

var _formatItalic = require('./editor/format-italic');

var _formatItalic2 = _interopRequireDefault(_formatItalic);

var _formatLineSpacing = require('./editor/format-line-spacing');

var _formatLineSpacing2 = _interopRequireDefault(_formatLineSpacing);

var _formatListBulleted = require('./editor/format-list-bulleted');

var _formatListBulleted2 = _interopRequireDefault(_formatListBulleted);

var _formatListNumbered = require('./editor/format-list-numbered');

var _formatListNumbered2 = _interopRequireDefault(_formatListNumbered);

var _formatPaint = require('./editor/format-paint');

var _formatPaint2 = _interopRequireDefault(_formatPaint);

var _formatQuote = require('./editor/format-quote');

var _formatQuote2 = _interopRequireDefault(_formatQuote);

var _formatShapes = require('./editor/format-shapes');

var _formatShapes2 = _interopRequireDefault(_formatShapes);

var _formatSize = require('./editor/format-size');

var _formatSize2 = _interopRequireDefault(_formatSize);

var _formatStrikethrough = require('./editor/format-strikethrough');

var _formatStrikethrough2 = _interopRequireDefault(_formatStrikethrough);

var _formatTextdirectionLToR = require('./editor/format-textdirection-l-to-r');

var _formatTextdirectionLToR2 = _interopRequireDefault(_formatTextdirectionLToR);

var _formatTextdirectionRToL = require('./editor/format-textdirection-r-to-l');

var _formatTextdirectionRToL2 = _interopRequireDefault(_formatTextdirectionRToL);

var _formatUnderlined = require('./editor/format-underlined');

var _formatUnderlined2 = _interopRequireDefault(_formatUnderlined);

var _functions = require('./editor/functions');

var _functions2 = _interopRequireDefault(_functions);

var _highlight = require('./editor/highlight');

var _highlight2 = _interopRequireDefault(_highlight);

var _insertChart = require('./editor/insert-chart');

var _insertChart2 = _interopRequireDefault(_insertChart);

var _insertComment = require('./editor/insert-comment');

var _insertComment2 = _interopRequireDefault(_insertComment);

var _insertDriveFile = require('./editor/insert-drive-file');

var _insertDriveFile2 = _interopRequireDefault(_insertDriveFile);

var _insertEmoticon = require('./editor/insert-emoticon');

var _insertEmoticon2 = _interopRequireDefault(_insertEmoticon);

var _insertInvitation = require('./editor/insert-invitation');

var _insertInvitation2 = _interopRequireDefault(_insertInvitation);

var _insertLink = require('./editor/insert-link');

var _insertLink2 = _interopRequireDefault(_insertLink);

var _insertPhoto = require('./editor/insert-photo');

var _insertPhoto2 = _interopRequireDefault(_insertPhoto);

var _linearScale = require('./editor/linear-scale');

var _linearScale2 = _interopRequireDefault(_linearScale);

var _mergeType = require('./editor/merge-type');

var _mergeType2 = _interopRequireDefault(_mergeType);

var _modeComment = require('./editor/mode-comment');

var _modeComment2 = _interopRequireDefault(_modeComment);

var _modeEdit = require('./editor/mode-edit');

var _modeEdit2 = _interopRequireDefault(_modeEdit);

var _monetizationOn = require('./editor/monetization-on');

var _monetizationOn2 = _interopRequireDefault(_monetizationOn);

var _moneyOff = require('./editor/money-off');

var _moneyOff2 = _interopRequireDefault(_moneyOff);

var _multilineChart = require('./editor/multiline-chart');

var _multilineChart2 = _interopRequireDefault(_multilineChart);

var _pieChartOutlined = require('./editor/pie-chart-outlined');

var _pieChartOutlined2 = _interopRequireDefault(_pieChartOutlined);

var _pieChart = require('./editor/pie-chart');

var _pieChart2 = _interopRequireDefault(_pieChart);

var _publish = require('./editor/publish');

var _publish2 = _interopRequireDefault(_publish);

var _shortText = require('./editor/short-text');

var _shortText2 = _interopRequireDefault(_shortText);

var _showChart = require('./editor/show-chart');

var _showChart2 = _interopRequireDefault(_showChart);

var _spaceBar = require('./editor/space-bar');

var _spaceBar2 = _interopRequireDefault(_spaceBar);

var _strikethroughS = require('./editor/strikethrough-s');

var _strikethroughS2 = _interopRequireDefault(_strikethroughS);

var _textFields = require('./editor/text-fields');

var _textFields2 = _interopRequireDefault(_textFields);

var _title = require('./editor/title');

var _title2 = _interopRequireDefault(_title);

var _verticalAlignBottom = require('./editor/vertical-align-bottom');

var _verticalAlignBottom2 = _interopRequireDefault(_verticalAlignBottom);

var _verticalAlignCenter = require('./editor/vertical-align-center');

var _verticalAlignCenter2 = _interopRequireDefault(_verticalAlignCenter);

var _verticalAlignTop = require('./editor/vertical-align-top');

var _verticalAlignTop2 = _interopRequireDefault(_verticalAlignTop);

var _wrapText = require('./editor/wrap-text');

var _wrapText2 = _interopRequireDefault(_wrapText);

var _attachment = require('./file/attachment');

var _attachment2 = _interopRequireDefault(_attachment);

var _cloudCircle = require('./file/cloud-circle');

var _cloudCircle2 = _interopRequireDefault(_cloudCircle);

var _cloudDone = require('./file/cloud-done');

var _cloudDone2 = _interopRequireDefault(_cloudDone);

var _cloudDownload = require('./file/cloud-download');

var _cloudDownload2 = _interopRequireDefault(_cloudDownload);

var _cloudOff = require('./file/cloud-off');

var _cloudOff2 = _interopRequireDefault(_cloudOff);

var _cloudQueue = require('./file/cloud-queue');

var _cloudQueue2 = _interopRequireDefault(_cloudQueue);

var _cloudUpload = require('./file/cloud-upload');

var _cloudUpload2 = _interopRequireDefault(_cloudUpload);

var _cloud = require('./file/cloud');

var _cloud2 = _interopRequireDefault(_cloud);

var _createNewFolder = require('./file/create-new-folder');

var _createNewFolder2 = _interopRequireDefault(_createNewFolder);

var _fileDownload = require('./file/file-download');

var _fileDownload2 = _interopRequireDefault(_fileDownload);

var _fileUpload = require('./file/file-upload');

var _fileUpload2 = _interopRequireDefault(_fileUpload);

var _folderOpen = require('./file/folder-open');

var _folderOpen2 = _interopRequireDefault(_folderOpen);

var _folderShared = require('./file/folder-shared');

var _folderShared2 = _interopRequireDefault(_folderShared);

var _folder = require('./file/folder');

var _folder2 = _interopRequireDefault(_folder);

var _castConnected = require('./hardware/cast-connected');

var _castConnected2 = _interopRequireDefault(_castConnected);

var _cast = require('./hardware/cast');

var _cast2 = _interopRequireDefault(_cast);

var _computer = require('./hardware/computer');

var _computer2 = _interopRequireDefault(_computer);

var _desktopMac = require('./hardware/desktop-mac');

var _desktopMac2 = _interopRequireDefault(_desktopMac);

var _desktopWindows = require('./hardware/desktop-windows');

var _desktopWindows2 = _interopRequireDefault(_desktopWindows);

var _developerBoard = require('./hardware/developer-board');

var _developerBoard2 = _interopRequireDefault(_developerBoard);

var _deviceHub = require('./hardware/device-hub');

var _deviceHub2 = _interopRequireDefault(_deviceHub);

var _devicesOther = require('./hardware/devices-other');

var _devicesOther2 = _interopRequireDefault(_devicesOther);

var _dock = require('./hardware/dock');

var _dock2 = _interopRequireDefault(_dock);

var _gamepad = require('./hardware/gamepad');

var _gamepad2 = _interopRequireDefault(_gamepad);

var _headsetMic = require('./hardware/headset-mic');

var _headsetMic2 = _interopRequireDefault(_headsetMic);

var _headset = require('./hardware/headset');

var _headset2 = _interopRequireDefault(_headset);

var _keyboardArrowDown = require('./hardware/keyboard-arrow-down');

var _keyboardArrowDown2 = _interopRequireDefault(_keyboardArrowDown);

var _keyboardArrowLeft = require('./hardware/keyboard-arrow-left');

var _keyboardArrowLeft2 = _interopRequireDefault(_keyboardArrowLeft);

var _keyboardArrowRight = require('./hardware/keyboard-arrow-right');

var _keyboardArrowRight2 = _interopRequireDefault(_keyboardArrowRight);

var _keyboardArrowUp = require('./hardware/keyboard-arrow-up');

var _keyboardArrowUp2 = _interopRequireDefault(_keyboardArrowUp);

var _keyboardBackspace = require('./hardware/keyboard-backspace');

var _keyboardBackspace2 = _interopRequireDefault(_keyboardBackspace);

var _keyboardCapslock = require('./hardware/keyboard-capslock');

var _keyboardCapslock2 = _interopRequireDefault(_keyboardCapslock);

var _keyboardHide = require('./hardware/keyboard-hide');

var _keyboardHide2 = _interopRequireDefault(_keyboardHide);

var _keyboardReturn = require('./hardware/keyboard-return');

var _keyboardReturn2 = _interopRequireDefault(_keyboardReturn);

var _keyboardTab = require('./hardware/keyboard-tab');

var _keyboardTab2 = _interopRequireDefault(_keyboardTab);

var _keyboardVoice = require('./hardware/keyboard-voice');

var _keyboardVoice2 = _interopRequireDefault(_keyboardVoice);

var _keyboard = require('./hardware/keyboard');

var _keyboard2 = _interopRequireDefault(_keyboard);

var _laptopChromebook = require('./hardware/laptop-chromebook');

var _laptopChromebook2 = _interopRequireDefault(_laptopChromebook);

var _laptopMac = require('./hardware/laptop-mac');

var _laptopMac2 = _interopRequireDefault(_laptopMac);

var _laptopWindows = require('./hardware/laptop-windows');

var _laptopWindows2 = _interopRequireDefault(_laptopWindows);

var _laptop = require('./hardware/laptop');

var _laptop2 = _interopRequireDefault(_laptop);

var _memory = require('./hardware/memory');

var _memory2 = _interopRequireDefault(_memory);

var _mouse = require('./hardware/mouse');

var _mouse2 = _interopRequireDefault(_mouse);

var _phoneAndroid = require('./hardware/phone-android');

var _phoneAndroid2 = _interopRequireDefault(_phoneAndroid);

var _phoneIphone = require('./hardware/phone-iphone');

var _phoneIphone2 = _interopRequireDefault(_phoneIphone);

var _phonelinkOff = require('./hardware/phonelink-off');

var _phonelinkOff2 = _interopRequireDefault(_phonelinkOff);

var _phonelink = require('./hardware/phonelink');

var _phonelink2 = _interopRequireDefault(_phonelink);

var _powerInput = require('./hardware/power-input');

var _powerInput2 = _interopRequireDefault(_powerInput);

var _router = require('./hardware/router');

var _router2 = _interopRequireDefault(_router);

var _scanner = require('./hardware/scanner');

var _scanner2 = _interopRequireDefault(_scanner);

var _security = require('./hardware/security');

var _security2 = _interopRequireDefault(_security);

var _simCard = require('./hardware/sim-card');

var _simCard2 = _interopRequireDefault(_simCard);

var _smartphone = require('./hardware/smartphone');

var _smartphone2 = _interopRequireDefault(_smartphone);

var _speakerGroup = require('./hardware/speaker-group');

var _speakerGroup2 = _interopRequireDefault(_speakerGroup);

var _speaker = require('./hardware/speaker');

var _speaker2 = _interopRequireDefault(_speaker);

var _tabletAndroid = require('./hardware/tablet-android');

var _tabletAndroid2 = _interopRequireDefault(_tabletAndroid);

var _tabletMac = require('./hardware/tablet-mac');

var _tabletMac2 = _interopRequireDefault(_tabletMac);

var _tablet = require('./hardware/tablet');

var _tablet2 = _interopRequireDefault(_tablet);

var _toys = require('./hardware/toys');

var _toys2 = _interopRequireDefault(_toys);

var _tv = require('./hardware/tv');

var _tv2 = _interopRequireDefault(_tv);

var _videogameAsset = require('./hardware/videogame-asset');

var _videogameAsset2 = _interopRequireDefault(_videogameAsset);

var _watch = require('./hardware/watch');

var _watch2 = _interopRequireDefault(_watch);

var _addAPhoto = require('./image/add-a-photo');

var _addAPhoto2 = _interopRequireDefault(_addAPhoto);

var _addToPhotos = require('./image/add-to-photos');

var _addToPhotos2 = _interopRequireDefault(_addToPhotos);

var _adjust = require('./image/adjust');

var _adjust2 = _interopRequireDefault(_adjust);

var _assistantPhoto = require('./image/assistant-photo');

var _assistantPhoto2 = _interopRequireDefault(_assistantPhoto);

var _assistant = require('./image/assistant');

var _assistant2 = _interopRequireDefault(_assistant);

var _audiotrack = require('./image/audiotrack');

var _audiotrack2 = _interopRequireDefault(_audiotrack);

var _blurCircular = require('./image/blur-circular');

var _blurCircular2 = _interopRequireDefault(_blurCircular);

var _blurLinear = require('./image/blur-linear');

var _blurLinear2 = _interopRequireDefault(_blurLinear);

var _blurOff = require('./image/blur-off');

var _blurOff2 = _interopRequireDefault(_blurOff);

var _blurOn = require('./image/blur-on');

var _blurOn2 = _interopRequireDefault(_blurOn);

var _brightness = require('./image/brightness-1');

var _brightness2 = _interopRequireDefault(_brightness);

var _brightness3 = require('./image/brightness-2');

var _brightness4 = _interopRequireDefault(_brightness3);

var _brightness5 = require('./image/brightness-3');

var _brightness6 = _interopRequireDefault(_brightness5);

var _brightness7 = require('./image/brightness-4');

var _brightness8 = _interopRequireDefault(_brightness7);

var _brightness9 = require('./image/brightness-5');

var _brightness10 = _interopRequireDefault(_brightness9);

var _brightness11 = require('./image/brightness-6');

var _brightness12 = _interopRequireDefault(_brightness11);

var _brightness13 = require('./image/brightness-7');

var _brightness14 = _interopRequireDefault(_brightness13);

var _brokenImage = require('./image/broken-image');

var _brokenImage2 = _interopRequireDefault(_brokenImage);

var _brush = require('./image/brush');

var _brush2 = _interopRequireDefault(_brush);

var _burstMode = require('./image/burst-mode');

var _burstMode2 = _interopRequireDefault(_burstMode);

var _cameraAlt = require('./image/camera-alt');

var _cameraAlt2 = _interopRequireDefault(_cameraAlt);

var _cameraFront = require('./image/camera-front');

var _cameraFront2 = _interopRequireDefault(_cameraFront);

var _cameraRear = require('./image/camera-rear');

var _cameraRear2 = _interopRequireDefault(_cameraRear);

var _cameraRoll = require('./image/camera-roll');

var _cameraRoll2 = _interopRequireDefault(_cameraRoll);

var _camera = require('./image/camera');

var _camera2 = _interopRequireDefault(_camera);

var _centerFocusStrong = require('./image/center-focus-strong');

var _centerFocusStrong2 = _interopRequireDefault(_centerFocusStrong);

var _centerFocusWeak = require('./image/center-focus-weak');

var _centerFocusWeak2 = _interopRequireDefault(_centerFocusWeak);

var _collectionsBookmark = require('./image/collections-bookmark');

var _collectionsBookmark2 = _interopRequireDefault(_collectionsBookmark);

var _collections = require('./image/collections');

var _collections2 = _interopRequireDefault(_collections);

var _colorLens = require('./image/color-lens');

var _colorLens2 = _interopRequireDefault(_colorLens);

var _colorize = require('./image/colorize');

var _colorize2 = _interopRequireDefault(_colorize);

var _compare = require('./image/compare');

var _compare2 = _interopRequireDefault(_compare);

var _controlPointDuplicate = require('./image/control-point-duplicate');

var _controlPointDuplicate2 = _interopRequireDefault(_controlPointDuplicate);

var _controlPoint = require('./image/control-point');

var _controlPoint2 = _interopRequireDefault(_controlPoint);

var _crop = require('./image/crop-16-9');

var _crop2 = _interopRequireDefault(_crop);

var _crop3 = require('./image/crop-3-2');

var _crop4 = _interopRequireDefault(_crop3);

var _crop5 = require('./image/crop-5-4');

var _crop6 = _interopRequireDefault(_crop5);

var _crop7 = require('./image/crop-7-5');

var _crop8 = _interopRequireDefault(_crop7);

var _cropDin = require('./image/crop-din');

var _cropDin2 = _interopRequireDefault(_cropDin);

var _cropFree = require('./image/crop-free');

var _cropFree2 = _interopRequireDefault(_cropFree);

var _cropLandscape = require('./image/crop-landscape');

var _cropLandscape2 = _interopRequireDefault(_cropLandscape);

var _cropOriginal = require('./image/crop-original');

var _cropOriginal2 = _interopRequireDefault(_cropOriginal);

var _cropPortrait = require('./image/crop-portrait');

var _cropPortrait2 = _interopRequireDefault(_cropPortrait);

var _cropRotate = require('./image/crop-rotate');

var _cropRotate2 = _interopRequireDefault(_cropRotate);

var _cropSquare = require('./image/crop-square');

var _cropSquare2 = _interopRequireDefault(_cropSquare);

var _crop9 = require('./image/crop');

var _crop10 = _interopRequireDefault(_crop9);

var _dehaze = require('./image/dehaze');

var _dehaze2 = _interopRequireDefault(_dehaze);

var _details = require('./image/details');

var _details2 = _interopRequireDefault(_details);

var _edit = require('./image/edit');

var _edit2 = _interopRequireDefault(_edit);

var _exposureNeg = require('./image/exposure-neg-1');

var _exposureNeg2 = _interopRequireDefault(_exposureNeg);

var _exposureNeg3 = require('./image/exposure-neg-2');

var _exposureNeg4 = _interopRequireDefault(_exposureNeg3);

var _exposurePlus = require('./image/exposure-plus-1');

var _exposurePlus2 = _interopRequireDefault(_exposurePlus);

var _exposurePlus3 = require('./image/exposure-plus-2');

var _exposurePlus4 = _interopRequireDefault(_exposurePlus3);

var _exposureZero = require('./image/exposure-zero');

var _exposureZero2 = _interopRequireDefault(_exposureZero);

var _exposure = require('./image/exposure');

var _exposure2 = _interopRequireDefault(_exposure);

var _filter = require('./image/filter-1');

var _filter2 = _interopRequireDefault(_filter);

var _filter3 = require('./image/filter-2');

var _filter4 = _interopRequireDefault(_filter3);

var _filter5 = require('./image/filter-3');

var _filter6 = _interopRequireDefault(_filter5);

var _filter7 = require('./image/filter-4');

var _filter8 = _interopRequireDefault(_filter7);

var _filter9 = require('./image/filter-5');

var _filter10 = _interopRequireDefault(_filter9);

var _filter11 = require('./image/filter-6');

var _filter12 = _interopRequireDefault(_filter11);

var _filter13 = require('./image/filter-7');

var _filter14 = _interopRequireDefault(_filter13);

var _filter15 = require('./image/filter-8');

var _filter16 = _interopRequireDefault(_filter15);

var _filter9Plus = require('./image/filter-9-plus');

var _filter9Plus2 = _interopRequireDefault(_filter9Plus);

var _filter17 = require('./image/filter-9');

var _filter18 = _interopRequireDefault(_filter17);

var _filterBAndW = require('./image/filter-b-and-w');

var _filterBAndW2 = _interopRequireDefault(_filterBAndW);

var _filterCenterFocus = require('./image/filter-center-focus');

var _filterCenterFocus2 = _interopRequireDefault(_filterCenterFocus);

var _filterDrama = require('./image/filter-drama');

var _filterDrama2 = _interopRequireDefault(_filterDrama);

var _filterFrames = require('./image/filter-frames');

var _filterFrames2 = _interopRequireDefault(_filterFrames);

var _filterHdr = require('./image/filter-hdr');

var _filterHdr2 = _interopRequireDefault(_filterHdr);

var _filterNone = require('./image/filter-none');

var _filterNone2 = _interopRequireDefault(_filterNone);

var _filterTiltShift = require('./image/filter-tilt-shift');

var _filterTiltShift2 = _interopRequireDefault(_filterTiltShift);

var _filterVintage = require('./image/filter-vintage');

var _filterVintage2 = _interopRequireDefault(_filterVintage);

var _filter19 = require('./image/filter');

var _filter20 = _interopRequireDefault(_filter19);

var _flare = require('./image/flare');

var _flare2 = _interopRequireDefault(_flare);

var _flashAuto = require('./image/flash-auto');

var _flashAuto2 = _interopRequireDefault(_flashAuto);

var _flashOff = require('./image/flash-off');

var _flashOff2 = _interopRequireDefault(_flashOff);

var _flashOn = require('./image/flash-on');

var _flashOn2 = _interopRequireDefault(_flashOn);

var _flip = require('./image/flip');

var _flip2 = _interopRequireDefault(_flip);

var _gradient = require('./image/gradient');

var _gradient2 = _interopRequireDefault(_gradient);

var _grain = require('./image/grain');

var _grain2 = _interopRequireDefault(_grain);

var _gridOff = require('./image/grid-off');

var _gridOff2 = _interopRequireDefault(_gridOff);

var _gridOn = require('./image/grid-on');

var _gridOn2 = _interopRequireDefault(_gridOn);

var _hdrOff = require('./image/hdr-off');

var _hdrOff2 = _interopRequireDefault(_hdrOff);

var _hdrOn = require('./image/hdr-on');

var _hdrOn2 = _interopRequireDefault(_hdrOn);

var _hdrStrong = require('./image/hdr-strong');

var _hdrStrong2 = _interopRequireDefault(_hdrStrong);

var _hdrWeak = require('./image/hdr-weak');

var _hdrWeak2 = _interopRequireDefault(_hdrWeak);

var _healing = require('./image/healing');

var _healing2 = _interopRequireDefault(_healing);

var _imageAspectRatio = require('./image/image-aspect-ratio');

var _imageAspectRatio2 = _interopRequireDefault(_imageAspectRatio);

var _image = require('./image/image');

var _image2 = _interopRequireDefault(_image);

var _iso = require('./image/iso');

var _iso2 = _interopRequireDefault(_iso);

var _landscape = require('./image/landscape');

var _landscape2 = _interopRequireDefault(_landscape);

var _leakAdd = require('./image/leak-add');

var _leakAdd2 = _interopRequireDefault(_leakAdd);

var _leakRemove = require('./image/leak-remove');

var _leakRemove2 = _interopRequireDefault(_leakRemove);

var _lens = require('./image/lens');

var _lens2 = _interopRequireDefault(_lens);

var _linkedCamera = require('./image/linked-camera');

var _linkedCamera2 = _interopRequireDefault(_linkedCamera);

var _looks = require('./image/looks-3');

var _looks2 = _interopRequireDefault(_looks);

var _looks3 = require('./image/looks-4');

var _looks4 = _interopRequireDefault(_looks3);

var _looks5 = require('./image/looks-5');

var _looks6 = _interopRequireDefault(_looks5);

var _looks7 = require('./image/looks-6');

var _looks8 = _interopRequireDefault(_looks7);

var _looksOne = require('./image/looks-one');

var _looksOne2 = _interopRequireDefault(_looksOne);

var _looksTwo = require('./image/looks-two');

var _looksTwo2 = _interopRequireDefault(_looksTwo);

var _looks9 = require('./image/looks');

var _looks10 = _interopRequireDefault(_looks9);

var _loupe = require('./image/loupe');

var _loupe2 = _interopRequireDefault(_loupe);

var _monochromePhotos = require('./image/monochrome-photos');

var _monochromePhotos2 = _interopRequireDefault(_monochromePhotos);

var _movieCreation = require('./image/movie-creation');

var _movieCreation2 = _interopRequireDefault(_movieCreation);

var _movieFilter = require('./image/movie-filter');

var _movieFilter2 = _interopRequireDefault(_movieFilter);

var _musicNote = require('./image/music-note');

var _musicNote2 = _interopRequireDefault(_musicNote);

var _naturePeople = require('./image/nature-people');

var _naturePeople2 = _interopRequireDefault(_naturePeople);

var _nature = require('./image/nature');

var _nature2 = _interopRequireDefault(_nature);

var _navigateBefore = require('./image/navigate-before');

var _navigateBefore2 = _interopRequireDefault(_navigateBefore);

var _navigateNext = require('./image/navigate-next');

var _navigateNext2 = _interopRequireDefault(_navigateNext);

var _palette = require('./image/palette');

var _palette2 = _interopRequireDefault(_palette);

var _panoramaFishEye = require('./image/panorama-fish-eye');

var _panoramaFishEye2 = _interopRequireDefault(_panoramaFishEye);

var _panoramaHorizontal = require('./image/panorama-horizontal');

var _panoramaHorizontal2 = _interopRequireDefault(_panoramaHorizontal);

var _panoramaVertical = require('./image/panorama-vertical');

var _panoramaVertical2 = _interopRequireDefault(_panoramaVertical);

var _panoramaWideAngle = require('./image/panorama-wide-angle');

var _panoramaWideAngle2 = _interopRequireDefault(_panoramaWideAngle);

var _panorama = require('./image/panorama');

var _panorama2 = _interopRequireDefault(_panorama);

var _photoAlbum = require('./image/photo-album');

var _photoAlbum2 = _interopRequireDefault(_photoAlbum);

var _photoCamera = require('./image/photo-camera');

var _photoCamera2 = _interopRequireDefault(_photoCamera);

var _photoFilter = require('./image/photo-filter');

var _photoFilter2 = _interopRequireDefault(_photoFilter);

var _photoLibrary = require('./image/photo-library');

var _photoLibrary2 = _interopRequireDefault(_photoLibrary);

var _photoSizeSelectActual = require('./image/photo-size-select-actual');

var _photoSizeSelectActual2 = _interopRequireDefault(_photoSizeSelectActual);

var _photoSizeSelectLarge = require('./image/photo-size-select-large');

var _photoSizeSelectLarge2 = _interopRequireDefault(_photoSizeSelectLarge);

var _photoSizeSelectSmall = require('./image/photo-size-select-small');

var _photoSizeSelectSmall2 = _interopRequireDefault(_photoSizeSelectSmall);

var _photo = require('./image/photo');

var _photo2 = _interopRequireDefault(_photo);

var _pictureAsPdf = require('./image/picture-as-pdf');

var _pictureAsPdf2 = _interopRequireDefault(_pictureAsPdf);

var _portrait = require('./image/portrait');

var _portrait2 = _interopRequireDefault(_portrait);

var _removeRedEye = require('./image/remove-red-eye');

var _removeRedEye2 = _interopRequireDefault(_removeRedEye);

var _rotate90DegreesCcw = require('./image/rotate-90-degrees-ccw');

var _rotate90DegreesCcw2 = _interopRequireDefault(_rotate90DegreesCcw);

var _rotateLeft = require('./image/rotate-left');

var _rotateLeft2 = _interopRequireDefault(_rotateLeft);

var _rotateRight = require('./image/rotate-right');

var _rotateRight2 = _interopRequireDefault(_rotateRight);

var _slideshow = require('./image/slideshow');

var _slideshow2 = _interopRequireDefault(_slideshow);

var _straighten = require('./image/straighten');

var _straighten2 = _interopRequireDefault(_straighten);

var _style = require('./image/style');

var _style2 = _interopRequireDefault(_style);

var _switchCamera = require('./image/switch-camera');

var _switchCamera2 = _interopRequireDefault(_switchCamera);

var _switchVideo = require('./image/switch-video');

var _switchVideo2 = _interopRequireDefault(_switchVideo);

var _tagFaces = require('./image/tag-faces');

var _tagFaces2 = _interopRequireDefault(_tagFaces);

var _texture = require('./image/texture');

var _texture2 = _interopRequireDefault(_texture);

var _timelapse = require('./image/timelapse');

var _timelapse2 = _interopRequireDefault(_timelapse);

var _timer = require('./image/timer-10');

var _timer2 = _interopRequireDefault(_timer);

var _timer3 = require('./image/timer-3');

var _timer4 = _interopRequireDefault(_timer3);

var _timerOff = require('./image/timer-off');

var _timerOff2 = _interopRequireDefault(_timerOff);

var _timer5 = require('./image/timer');

var _timer6 = _interopRequireDefault(_timer5);

var _tonality = require('./image/tonality');

var _tonality2 = _interopRequireDefault(_tonality);

var _transform = require('./image/transform');

var _transform2 = _interopRequireDefault(_transform);

var _tune = require('./image/tune');

var _tune2 = _interopRequireDefault(_tune);

var _viewComfy = require('./image/view-comfy');

var _viewComfy2 = _interopRequireDefault(_viewComfy);

var _viewCompact = require('./image/view-compact');

var _viewCompact2 = _interopRequireDefault(_viewCompact);

var _vignette = require('./image/vignette');

var _vignette2 = _interopRequireDefault(_vignette);

var _wbAuto = require('./image/wb-auto');

var _wbAuto2 = _interopRequireDefault(_wbAuto);

var _wbCloudy = require('./image/wb-cloudy');

var _wbCloudy2 = _interopRequireDefault(_wbCloudy);

var _wbIncandescent = require('./image/wb-incandescent');

var _wbIncandescent2 = _interopRequireDefault(_wbIncandescent);

var _wbIridescent = require('./image/wb-iridescent');

var _wbIridescent2 = _interopRequireDefault(_wbIridescent);

var _wbSunny = require('./image/wb-sunny');

var _wbSunny2 = _interopRequireDefault(_wbSunny);

var _addLocation = require('./maps/add-location');

var _addLocation2 = _interopRequireDefault(_addLocation);

var _beenhere = require('./maps/beenhere');

var _beenhere2 = _interopRequireDefault(_beenhere);

var _directionsBike = require('./maps/directions-bike');

var _directionsBike2 = _interopRequireDefault(_directionsBike);

var _directionsBoat = require('./maps/directions-boat');

var _directionsBoat2 = _interopRequireDefault(_directionsBoat);

var _directionsBus = require('./maps/directions-bus');

var _directionsBus2 = _interopRequireDefault(_directionsBus);

var _directionsCar = require('./maps/directions-car');

var _directionsCar2 = _interopRequireDefault(_directionsCar);

var _directionsRailway = require('./maps/directions-railway');

var _directionsRailway2 = _interopRequireDefault(_directionsRailway);

var _directionsRun = require('./maps/directions-run');

var _directionsRun2 = _interopRequireDefault(_directionsRun);

var _directionsSubway = require('./maps/directions-subway');

var _directionsSubway2 = _interopRequireDefault(_directionsSubway);

var _directionsTransit = require('./maps/directions-transit');

var _directionsTransit2 = _interopRequireDefault(_directionsTransit);

var _directionsWalk = require('./maps/directions-walk');

var _directionsWalk2 = _interopRequireDefault(_directionsWalk);

var _directions = require('./maps/directions');

var _directions2 = _interopRequireDefault(_directions);

var _editLocation = require('./maps/edit-location');

var _editLocation2 = _interopRequireDefault(_editLocation);

var _evStation = require('./maps/ev-station');

var _evStation2 = _interopRequireDefault(_evStation);

var _flight = require('./maps/flight');

var _flight2 = _interopRequireDefault(_flight);

var _hotel = require('./maps/hotel');

var _hotel2 = _interopRequireDefault(_hotel);

var _layersClear = require('./maps/layers-clear');

var _layersClear2 = _interopRequireDefault(_layersClear);

var _layers = require('./maps/layers');

var _layers2 = _interopRequireDefault(_layers);

var _localActivity = require('./maps/local-activity');

var _localActivity2 = _interopRequireDefault(_localActivity);

var _localAirport = require('./maps/local-airport');

var _localAirport2 = _interopRequireDefault(_localAirport);

var _localAtm = require('./maps/local-atm');

var _localAtm2 = _interopRequireDefault(_localAtm);

var _localBar = require('./maps/local-bar');

var _localBar2 = _interopRequireDefault(_localBar);

var _localCafe = require('./maps/local-cafe');

var _localCafe2 = _interopRequireDefault(_localCafe);

var _localCarWash = require('./maps/local-car-wash');

var _localCarWash2 = _interopRequireDefault(_localCarWash);

var _localConvenienceStore = require('./maps/local-convenience-store');

var _localConvenienceStore2 = _interopRequireDefault(_localConvenienceStore);

var _localDining = require('./maps/local-dining');

var _localDining2 = _interopRequireDefault(_localDining);

var _localDrink = require('./maps/local-drink');

var _localDrink2 = _interopRequireDefault(_localDrink);

var _localFlorist = require('./maps/local-florist');

var _localFlorist2 = _interopRequireDefault(_localFlorist);

var _localGasStation = require('./maps/local-gas-station');

var _localGasStation2 = _interopRequireDefault(_localGasStation);

var _localGroceryStore = require('./maps/local-grocery-store');

var _localGroceryStore2 = _interopRequireDefault(_localGroceryStore);

var _localHospital = require('./maps/local-hospital');

var _localHospital2 = _interopRequireDefault(_localHospital);

var _localHotel = require('./maps/local-hotel');

var _localHotel2 = _interopRequireDefault(_localHotel);

var _localLaundryService = require('./maps/local-laundry-service');

var _localLaundryService2 = _interopRequireDefault(_localLaundryService);

var _localLibrary = require('./maps/local-library');

var _localLibrary2 = _interopRequireDefault(_localLibrary);

var _localMall = require('./maps/local-mall');

var _localMall2 = _interopRequireDefault(_localMall);

var _localMovies = require('./maps/local-movies');

var _localMovies2 = _interopRequireDefault(_localMovies);

var _localOffer = require('./maps/local-offer');

var _localOffer2 = _interopRequireDefault(_localOffer);

var _localParking = require('./maps/local-parking');

var _localParking2 = _interopRequireDefault(_localParking);

var _localPharmacy = require('./maps/local-pharmacy');

var _localPharmacy2 = _interopRequireDefault(_localPharmacy);

var _localPhone = require('./maps/local-phone');

var _localPhone2 = _interopRequireDefault(_localPhone);

var _localPizza = require('./maps/local-pizza');

var _localPizza2 = _interopRequireDefault(_localPizza);

var _localPlay = require('./maps/local-play');

var _localPlay2 = _interopRequireDefault(_localPlay);

var _localPostOffice = require('./maps/local-post-office');

var _localPostOffice2 = _interopRequireDefault(_localPostOffice);

var _localPrintshop = require('./maps/local-printshop');

var _localPrintshop2 = _interopRequireDefault(_localPrintshop);

var _localSee = require('./maps/local-see');

var _localSee2 = _interopRequireDefault(_localSee);

var _localShipping = require('./maps/local-shipping');

var _localShipping2 = _interopRequireDefault(_localShipping);

var _localTaxi = require('./maps/local-taxi');

var _localTaxi2 = _interopRequireDefault(_localTaxi);

var _map = require('./maps/map');

var _map2 = _interopRequireDefault(_map);

var _myLocation = require('./maps/my-location');

var _myLocation2 = _interopRequireDefault(_myLocation);

var _navigation = require('./maps/navigation');

var _navigation2 = _interopRequireDefault(_navigation);

var _nearMe = require('./maps/near-me');

var _nearMe2 = _interopRequireDefault(_nearMe);

var _personPinCircle = require('./maps/person-pin-circle');

var _personPinCircle2 = _interopRequireDefault(_personPinCircle);

var _personPin = require('./maps/person-pin');

var _personPin2 = _interopRequireDefault(_personPin);

var _pinDrop = require('./maps/pin-drop');

var _pinDrop2 = _interopRequireDefault(_pinDrop);

var _place = require('./maps/place');

var _place2 = _interopRequireDefault(_place);

var _rateReview = require('./maps/rate-review');

var _rateReview2 = _interopRequireDefault(_rateReview);

var _restaurantMenu = require('./maps/restaurant-menu');

var _restaurantMenu2 = _interopRequireDefault(_restaurantMenu);

var _restaurant = require('./maps/restaurant');

var _restaurant2 = _interopRequireDefault(_restaurant);

var _satellite = require('./maps/satellite');

var _satellite2 = _interopRequireDefault(_satellite);

var _storeMallDirectory = require('./maps/store-mall-directory');

var _storeMallDirectory2 = _interopRequireDefault(_storeMallDirectory);

var _streetview = require('./maps/streetview');

var _streetview2 = _interopRequireDefault(_streetview);

var _subway = require('./maps/subway');

var _subway2 = _interopRequireDefault(_subway);

var _terrain = require('./maps/terrain');

var _terrain2 = _interopRequireDefault(_terrain);

var _traffic = require('./maps/traffic');

var _traffic2 = _interopRequireDefault(_traffic);

var _train = require('./maps/train');

var _train2 = _interopRequireDefault(_train);

var _tram = require('./maps/tram');

var _tram2 = _interopRequireDefault(_tram);

var _transferWithinAStation = require('./maps/transfer-within-a-station');

var _transferWithinAStation2 = _interopRequireDefault(_transferWithinAStation);

var _zoomOutMap = require('./maps/zoom-out-map');

var _zoomOutMap2 = _interopRequireDefault(_zoomOutMap);

var _apps = require('./navigation/apps');

var _apps2 = _interopRequireDefault(_apps);

var _arrowBack = require('./navigation/arrow-back');

var _arrowBack2 = _interopRequireDefault(_arrowBack);

var _arrowDownward = require('./navigation/arrow-downward');

var _arrowDownward2 = _interopRequireDefault(_arrowDownward);

var _arrowDropDownCircle = require('./navigation/arrow-drop-down-circle');

var _arrowDropDownCircle2 = _interopRequireDefault(_arrowDropDownCircle);

var _arrowDropDown = require('./navigation/arrow-drop-down');

var _arrowDropDown2 = _interopRequireDefault(_arrowDropDown);

var _arrowDropUp = require('./navigation/arrow-drop-up');

var _arrowDropUp2 = _interopRequireDefault(_arrowDropUp);

var _arrowForward = require('./navigation/arrow-forward');

var _arrowForward2 = _interopRequireDefault(_arrowForward);

var _arrowUpward = require('./navigation/arrow-upward');

var _arrowUpward2 = _interopRequireDefault(_arrowUpward);

var _cancel = require('./navigation/cancel');

var _cancel2 = _interopRequireDefault(_cancel);

var _check = require('./navigation/check');

var _check2 = _interopRequireDefault(_check);

var _chevronLeft = require('./navigation/chevron-left');

var _chevronLeft2 = _interopRequireDefault(_chevronLeft);

var _chevronRight = require('./navigation/chevron-right');

var _chevronRight2 = _interopRequireDefault(_chevronRight);

var _close = require('./navigation/close');

var _close2 = _interopRequireDefault(_close);

var _expandLess = require('./navigation/expand-less');

var _expandLess2 = _interopRequireDefault(_expandLess);

var _expandMore = require('./navigation/expand-more');

var _expandMore2 = _interopRequireDefault(_expandMore);

var _firstPage = require('./navigation/first-page');

var _firstPage2 = _interopRequireDefault(_firstPage);

var _fullscreenExit = require('./navigation/fullscreen-exit');

var _fullscreenExit2 = _interopRequireDefault(_fullscreenExit);

var _fullscreen = require('./navigation/fullscreen');

var _fullscreen2 = _interopRequireDefault(_fullscreen);

var _lastPage = require('./navigation/last-page');

var _lastPage2 = _interopRequireDefault(_lastPage);

var _menu = require('./navigation/menu');

var _menu2 = _interopRequireDefault(_menu);

var _moreHoriz = require('./navigation/more-horiz');

var _moreHoriz2 = _interopRequireDefault(_moreHoriz);

var _moreVert = require('./navigation/more-vert');

var _moreVert2 = _interopRequireDefault(_moreVert);

var _refresh = require('./navigation/refresh');

var _refresh2 = _interopRequireDefault(_refresh);

var _subdirectoryArrowLeft = require('./navigation/subdirectory-arrow-left');

var _subdirectoryArrowLeft2 = _interopRequireDefault(_subdirectoryArrowLeft);

var _subdirectoryArrowRight = require('./navigation/subdirectory-arrow-right');

var _subdirectoryArrowRight2 = _interopRequireDefault(_subdirectoryArrowRight);

var _unfoldLess = require('./navigation/unfold-less');

var _unfoldLess2 = _interopRequireDefault(_unfoldLess);

var _unfoldMore = require('./navigation/unfold-more');

var _unfoldMore2 = _interopRequireDefault(_unfoldMore);

var _navigationArrowDropRight = require('./navigation-arrow-drop-right');

var _navigationArrowDropRight2 = _interopRequireDefault(_navigationArrowDropRight);

var _adb = require('./notification/adb');

var _adb2 = _interopRequireDefault(_adb);

var _airlineSeatFlatAngled = require('./notification/airline-seat-flat-angled');

var _airlineSeatFlatAngled2 = _interopRequireDefault(_airlineSeatFlatAngled);

var _airlineSeatFlat = require('./notification/airline-seat-flat');

var _airlineSeatFlat2 = _interopRequireDefault(_airlineSeatFlat);

var _airlineSeatIndividualSuite = require('./notification/airline-seat-individual-suite');

var _airlineSeatIndividualSuite2 = _interopRequireDefault(_airlineSeatIndividualSuite);

var _airlineSeatLegroomExtra = require('./notification/airline-seat-legroom-extra');

var _airlineSeatLegroomExtra2 = _interopRequireDefault(_airlineSeatLegroomExtra);

var _airlineSeatLegroomNormal = require('./notification/airline-seat-legroom-normal');

var _airlineSeatLegroomNormal2 = _interopRequireDefault(_airlineSeatLegroomNormal);

var _airlineSeatLegroomReduced = require('./notification/airline-seat-legroom-reduced');

var _airlineSeatLegroomReduced2 = _interopRequireDefault(_airlineSeatLegroomReduced);

var _airlineSeatReclineExtra = require('./notification/airline-seat-recline-extra');

var _airlineSeatReclineExtra2 = _interopRequireDefault(_airlineSeatReclineExtra);

var _airlineSeatReclineNormal = require('./notification/airline-seat-recline-normal');

var _airlineSeatReclineNormal2 = _interopRequireDefault(_airlineSeatReclineNormal);

var _bluetoothAudio = require('./notification/bluetooth-audio');

var _bluetoothAudio2 = _interopRequireDefault(_bluetoothAudio);

var _confirmationNumber = require('./notification/confirmation-number');

var _confirmationNumber2 = _interopRequireDefault(_confirmationNumber);

var _discFull = require('./notification/disc-full');

var _discFull2 = _interopRequireDefault(_discFull);

var _doNotDisturbAlt = require('./notification/do-not-disturb-alt');

var _doNotDisturbAlt2 = _interopRequireDefault(_doNotDisturbAlt);

var _doNotDisturbOff = require('./notification/do-not-disturb-off');

var _doNotDisturbOff2 = _interopRequireDefault(_doNotDisturbOff);

var _doNotDisturbOn = require('./notification/do-not-disturb-on');

var _doNotDisturbOn2 = _interopRequireDefault(_doNotDisturbOn);

var _doNotDisturb = require('./notification/do-not-disturb');

var _doNotDisturb2 = _interopRequireDefault(_doNotDisturb);

var _driveEta = require('./notification/drive-eta');

var _driveEta2 = _interopRequireDefault(_driveEta);

var _enhancedEncryption = require('./notification/enhanced-encryption');

var _enhancedEncryption2 = _interopRequireDefault(_enhancedEncryption);

var _eventAvailable = require('./notification/event-available');

var _eventAvailable2 = _interopRequireDefault(_eventAvailable);

var _eventBusy = require('./notification/event-busy');

var _eventBusy2 = _interopRequireDefault(_eventBusy);

var _eventNote = require('./notification/event-note');

var _eventNote2 = _interopRequireDefault(_eventNote);

var _folderSpecial = require('./notification/folder-special');

var _folderSpecial2 = _interopRequireDefault(_folderSpecial);

var _liveTv = require('./notification/live-tv');

var _liveTv2 = _interopRequireDefault(_liveTv);

var _mms = require('./notification/mms');

var _mms2 = _interopRequireDefault(_mms);

var _more = require('./notification/more');

var _more2 = _interopRequireDefault(_more);

var _networkCheck = require('./notification/network-check');

var _networkCheck2 = _interopRequireDefault(_networkCheck);

var _networkLocked = require('./notification/network-locked');

var _networkLocked2 = _interopRequireDefault(_networkLocked);

var _noEncryption = require('./notification/no-encryption');

var _noEncryption2 = _interopRequireDefault(_noEncryption);

var _ondemandVideo = require('./notification/ondemand-video');

var _ondemandVideo2 = _interopRequireDefault(_ondemandVideo);

var _personalVideo = require('./notification/personal-video');

var _personalVideo2 = _interopRequireDefault(_personalVideo);

var _phoneBluetoothSpeaker = require('./notification/phone-bluetooth-speaker');

var _phoneBluetoothSpeaker2 = _interopRequireDefault(_phoneBluetoothSpeaker);

var _phoneForwarded = require('./notification/phone-forwarded');

var _phoneForwarded2 = _interopRequireDefault(_phoneForwarded);

var _phoneInTalk = require('./notification/phone-in-talk');

var _phoneInTalk2 = _interopRequireDefault(_phoneInTalk);

var _phoneLocked = require('./notification/phone-locked');

var _phoneLocked2 = _interopRequireDefault(_phoneLocked);

var _phoneMissed = require('./notification/phone-missed');

var _phoneMissed2 = _interopRequireDefault(_phoneMissed);

var _phonePaused = require('./notification/phone-paused');

var _phonePaused2 = _interopRequireDefault(_phonePaused);

var _power = require('./notification/power');

var _power2 = _interopRequireDefault(_power);

var _priorityHigh = require('./notification/priority-high');

var _priorityHigh2 = _interopRequireDefault(_priorityHigh);

var _rvHookup = require('./notification/rv-hookup');

var _rvHookup2 = _interopRequireDefault(_rvHookup);

var _sdCard = require('./notification/sd-card');

var _sdCard2 = _interopRequireDefault(_sdCard);

var _simCardAlert = require('./notification/sim-card-alert');

var _simCardAlert2 = _interopRequireDefault(_simCardAlert);

var _smsFailed = require('./notification/sms-failed');

var _smsFailed2 = _interopRequireDefault(_smsFailed);

var _sms = require('./notification/sms');

var _sms2 = _interopRequireDefault(_sms);

var _syncDisabled = require('./notification/sync-disabled');

var _syncDisabled2 = _interopRequireDefault(_syncDisabled);

var _syncProblem = require('./notification/sync-problem');

var _syncProblem2 = _interopRequireDefault(_syncProblem);

var _sync = require('./notification/sync');

var _sync2 = _interopRequireDefault(_sync);

var _systemUpdate = require('./notification/system-update');

var _systemUpdate2 = _interopRequireDefault(_systemUpdate);

var _tapAndPlay = require('./notification/tap-and-play');

var _tapAndPlay2 = _interopRequireDefault(_tapAndPlay);

var _timeToLeave = require('./notification/time-to-leave');

var _timeToLeave2 = _interopRequireDefault(_timeToLeave);

var _vibration = require('./notification/vibration');

var _vibration2 = _interopRequireDefault(_vibration);

var _voiceChat = require('./notification/voice-chat');

var _voiceChat2 = _interopRequireDefault(_voiceChat);

var _vpnLock = require('./notification/vpn-lock');

var _vpnLock2 = _interopRequireDefault(_vpnLock);

var _wc = require('./notification/wc');

var _wc2 = _interopRequireDefault(_wc);

var _wifi = require('./notification/wifi');

var _wifi2 = _interopRequireDefault(_wifi);

var _acUnit = require('./places/ac-unit');

var _acUnit2 = _interopRequireDefault(_acUnit);

var _airportShuttle = require('./places/airport-shuttle');

var _airportShuttle2 = _interopRequireDefault(_airportShuttle);

var _allInclusive = require('./places/all-inclusive');

var _allInclusive2 = _interopRequireDefault(_allInclusive);

var _beachAccess = require('./places/beach-access');

var _beachAccess2 = _interopRequireDefault(_beachAccess);

var _businessCenter = require('./places/business-center');

var _businessCenter2 = _interopRequireDefault(_businessCenter);

var _casino = require('./places/casino');

var _casino2 = _interopRequireDefault(_casino);

var _childCare = require('./places/child-care');

var _childCare2 = _interopRequireDefault(_childCare);

var _childFriendly = require('./places/child-friendly');

var _childFriendly2 = _interopRequireDefault(_childFriendly);

var _fitnessCenter = require('./places/fitness-center');

var _fitnessCenter2 = _interopRequireDefault(_fitnessCenter);

var _freeBreakfast = require('./places/free-breakfast');

var _freeBreakfast2 = _interopRequireDefault(_freeBreakfast);

var _golfCourse = require('./places/golf-course');

var _golfCourse2 = _interopRequireDefault(_golfCourse);

var _hotTub = require('./places/hot-tub');

var _hotTub2 = _interopRequireDefault(_hotTub);

var _kitchen = require('./places/kitchen');

var _kitchen2 = _interopRequireDefault(_kitchen);

var _pool = require('./places/pool');

var _pool2 = _interopRequireDefault(_pool);

var _roomService = require('./places/room-service');

var _roomService2 = _interopRequireDefault(_roomService);

var _rvHookup3 = require('./places/rv-hookup');

var _rvHookup4 = _interopRequireDefault(_rvHookup3);

var _smokeFree = require('./places/smoke-free');

var _smokeFree2 = _interopRequireDefault(_smokeFree);

var _smokingRooms = require('./places/smoking-rooms');

var _smokingRooms2 = _interopRequireDefault(_smokingRooms);

var _spa = require('./places/spa');

var _spa2 = _interopRequireDefault(_spa);

var _cake = require('./social/cake');

var _cake2 = _interopRequireDefault(_cake);

var _domain = require('./social/domain');

var _domain2 = _interopRequireDefault(_domain);

var _groupAdd = require('./social/group-add');

var _groupAdd2 = _interopRequireDefault(_groupAdd);

var _group = require('./social/group');

var _group2 = _interopRequireDefault(_group);

var _locationCity = require('./social/location-city');

var _locationCity2 = _interopRequireDefault(_locationCity);

var _moodBad = require('./social/mood-bad');

var _moodBad2 = _interopRequireDefault(_moodBad);

var _mood = require('./social/mood');

var _mood2 = _interopRequireDefault(_mood);

var _notificationsActive = require('./social/notifications-active');

var _notificationsActive2 = _interopRequireDefault(_notificationsActive);

var _notificationsNone = require('./social/notifications-none');

var _notificationsNone2 = _interopRequireDefault(_notificationsNone);

var _notificationsOff = require('./social/notifications-off');

var _notificationsOff2 = _interopRequireDefault(_notificationsOff);

var _notificationsPaused = require('./social/notifications-paused');

var _notificationsPaused2 = _interopRequireDefault(_notificationsPaused);

var _notifications = require('./social/notifications');

var _notifications2 = _interopRequireDefault(_notifications);

var _pages = require('./social/pages');

var _pages2 = _interopRequireDefault(_pages);

var _partyMode = require('./social/party-mode');

var _partyMode2 = _interopRequireDefault(_partyMode);

var _peopleOutline = require('./social/people-outline');

var _peopleOutline2 = _interopRequireDefault(_peopleOutline);

var _people = require('./social/people');

var _people2 = _interopRequireDefault(_people);

var _personAdd = require('./social/person-add');

var _personAdd2 = _interopRequireDefault(_personAdd);

var _personOutline = require('./social/person-outline');

var _personOutline2 = _interopRequireDefault(_personOutline);

var _person = require('./social/person');

var _person2 = _interopRequireDefault(_person);

var _plusOne = require('./social/plus-one');

var _plusOne2 = _interopRequireDefault(_plusOne);

var _poll = require('./social/poll');

var _poll2 = _interopRequireDefault(_poll);

var _public = require('./social/public');

var _public2 = _interopRequireDefault(_public);

var _school = require('./social/school');

var _school2 = _interopRequireDefault(_school);

var _sentimentDissatisfied = require('./social/sentiment-dissatisfied');

var _sentimentDissatisfied2 = _interopRequireDefault(_sentimentDissatisfied);

var _sentimentNeutral = require('./social/sentiment-neutral');

var _sentimentNeutral2 = _interopRequireDefault(_sentimentNeutral);

var _sentimentSatisfied = require('./social/sentiment-satisfied');

var _sentimentSatisfied2 = _interopRequireDefault(_sentimentSatisfied);

var _sentimentVeryDissatisfied = require('./social/sentiment-very-dissatisfied');

var _sentimentVeryDissatisfied2 = _interopRequireDefault(_sentimentVeryDissatisfied);

var _sentimentVerySatisfied = require('./social/sentiment-very-satisfied');

var _sentimentVerySatisfied2 = _interopRequireDefault(_sentimentVerySatisfied);

var _share = require('./social/share');

var _share2 = _interopRequireDefault(_share);

var _whatshot = require('./social/whatshot');

var _whatshot2 = _interopRequireDefault(_whatshot);

var _checkBoxOutlineBlank = require('./toggle/check-box-outline-blank');

var _checkBoxOutlineBlank2 = _interopRequireDefault(_checkBoxOutlineBlank);

var _checkBox = require('./toggle/check-box');

var _checkBox2 = _interopRequireDefault(_checkBox);

var _indeterminateCheckBox = require('./toggle/indeterminate-check-box');

var _indeterminateCheckBox2 = _interopRequireDefault(_indeterminateCheckBox);

var _radioButtonChecked = require('./toggle/radio-button-checked');

var _radioButtonChecked2 = _interopRequireDefault(_radioButtonChecked);

var _radioButtonUnchecked = require('./toggle/radio-button-unchecked');

var _radioButtonUnchecked2 = _interopRequireDefault(_radioButtonUnchecked);

var _starBorder = require('./toggle/star-border');

var _starBorder2 = _interopRequireDefault(_starBorder);

var _starHalf = require('./toggle/star-half');

var _starHalf2 = _interopRequireDefault(_starHalf);

var _star = require('./toggle/star');

var _star2 = _interopRequireDefault(_star);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.ActionAccessibility = _accessibility2.default;
exports.ActionAccessible = _accessible2.default;
exports.ActionAccountBalanceWallet = _accountBalanceWallet2.default;
exports.ActionAccountBalance = _accountBalance2.default;
exports.ActionAccountBox = _accountBox2.default;
exports.ActionAccountCircle = _accountCircle2.default;
exports.ActionAddShoppingCart = _addShoppingCart2.default;
exports.ActionAlarmAdd = _alarmAdd2.default;
exports.ActionAlarmOff = _alarmOff2.default;
exports.ActionAlarmOn = _alarmOn2.default;
exports.ActionAlarm = _alarm2.default;
exports.ActionAllOut = _allOut2.default;
exports.ActionAndroid = _android2.default;
exports.ActionAnnouncement = _announcement2.default;
exports.ActionAspectRatio = _aspectRatio2.default;
exports.ActionAssessment = _assessment2.default;
exports.ActionAssignmentInd = _assignmentInd2.default;
exports.ActionAssignmentLate = _assignmentLate2.default;
exports.ActionAssignmentReturn = _assignmentReturn2.default;
exports.ActionAssignmentReturned = _assignmentReturned2.default;
exports.ActionAssignmentTurnedIn = _assignmentTurnedIn2.default;
exports.ActionAssignment = _assignment2.default;
exports.ActionAutorenew = _autorenew2.default;
exports.ActionBackup = _backup2.default;
exports.ActionBook = _book2.default;
exports.ActionBookmarkBorder = _bookmarkBorder2.default;
exports.ActionBookmark = _bookmark2.default;
exports.ActionBugReport = _bugReport2.default;
exports.ActionBuild = _build2.default;
exports.ActionCached = _cached2.default;
exports.ActionCameraEnhance = _cameraEnhance2.default;
exports.ActionCardGiftcard = _cardGiftcard2.default;
exports.ActionCardMembership = _cardMembership2.default;
exports.ActionCardTravel = _cardTravel2.default;
exports.ActionChangeHistory = _changeHistory2.default;
exports.ActionCheckCircle = _checkCircle2.default;
exports.ActionChromeReaderMode = _chromeReaderMode2.default;
exports.ActionClass = _class2.default;
exports.ActionCode = _code2.default;
exports.ActionCompareArrows = _compareArrows2.default;
exports.ActionCopyright = _copyright2.default;
exports.ActionCreditCard = _creditCard2.default;
exports.ActionDashboard = _dashboard2.default;
exports.ActionDateRange = _dateRange2.default;
exports.ActionDeleteForever = _deleteForever2.default;
exports.ActionDelete = _delete2.default;
exports.ActionDescription = _description2.default;
exports.ActionDns = _dns2.default;
exports.ActionDoneAll = _doneAll2.default;
exports.ActionDone = _done2.default;
exports.ActionDonutLarge = _donutLarge2.default;
exports.ActionDonutSmall = _donutSmall2.default;
exports.ActionEject = _eject2.default;
exports.ActionEuroSymbol = _euroSymbol2.default;
exports.ActionEventSeat = _eventSeat2.default;
exports.ActionEvent = _event2.default;
exports.ActionExitToApp = _exitToApp2.default;
exports.ActionExplore = _explore2.default;
exports.ActionExtension = _extension2.default;
exports.ActionFace = _face2.default;
exports.ActionFavoriteBorder = _favoriteBorder2.default;
exports.ActionFavorite = _favorite2.default;
exports.ActionFeedback = _feedback2.default;
exports.ActionFindInPage = _findInPage2.default;
exports.ActionFindReplace = _findReplace2.default;
exports.ActionFingerprint = _fingerprint2.default;
exports.ActionFlightLand = _flightLand2.default;
exports.ActionFlightTakeoff = _flightTakeoff2.default;
exports.ActionFlipToBack = _flipToBack2.default;
exports.ActionFlipToFront = _flipToFront2.default;
exports.ActionGTranslate = _gTranslate2.default;
exports.ActionGavel = _gavel2.default;
exports.ActionGetApp = _getApp2.default;
exports.ActionGif = _gif2.default;
exports.ActionGrade = _grade2.default;
exports.ActionGroupWork = _groupWork2.default;
exports.ActionHelpOutline = _helpOutline2.default;
exports.ActionHelp = _help2.default;
exports.ActionHighlightOff = _highlightOff2.default;
exports.ActionHistory = _history2.default;
exports.ActionHome = _home2.default;
exports.ActionHourglassEmpty = _hourglassEmpty2.default;
exports.ActionHourglassFull = _hourglassFull2.default;
exports.ActionHttp = _http2.default;
exports.ActionHttps = _https2.default;
exports.ActionImportantDevices = _importantDevices2.default;
exports.ActionInfoOutline = _infoOutline2.default;
exports.ActionInfo = _info2.default;
exports.ActionInput = _input2.default;
exports.ActionInvertColors = _invertColors2.default;
exports.ActionLabelOutline = _labelOutline2.default;
exports.ActionLabel = _label2.default;
exports.ActionLanguage = _language2.default;
exports.ActionLaunch = _launch2.default;
exports.ActionLightbulbOutline = _lightbulbOutline2.default;
exports.ActionLineStyle = _lineStyle2.default;
exports.ActionLineWeight = _lineWeight2.default;
exports.ActionList = _list2.default;
exports.ActionLockOpen = _lockOpen2.default;
exports.ActionLockOutline = _lockOutline2.default;
exports.ActionLock = _lock2.default;
exports.ActionLoyalty = _loyalty2.default;
exports.ActionMarkunreadMailbox = _markunreadMailbox2.default;
exports.ActionMotorcycle = _motorcycle2.default;
exports.ActionNoteAdd = _noteAdd2.default;
exports.ActionOfflinePin = _offlinePin2.default;
exports.ActionOpacity = _opacity2.default;
exports.ActionOpenInBrowser = _openInBrowser2.default;
exports.ActionOpenInNew = _openInNew2.default;
exports.ActionOpenWith = _openWith2.default;
exports.ActionPageview = _pageview2.default;
exports.ActionPanTool = _panTool2.default;
exports.ActionPayment = _payment2.default;
exports.ActionPermCameraMic = _permCameraMic2.default;
exports.ActionPermContactCalendar = _permContactCalendar2.default;
exports.ActionPermDataSetting = _permDataSetting2.default;
exports.ActionPermDeviceInformation = _permDeviceInformation2.default;
exports.ActionPermIdentity = _permIdentity2.default;
exports.ActionPermMedia = _permMedia2.default;
exports.ActionPermPhoneMsg = _permPhoneMsg2.default;
exports.ActionPermScanWifi = _permScanWifi2.default;
exports.ActionPets = _pets2.default;
exports.ActionPictureInPictureAlt = _pictureInPictureAlt2.default;
exports.ActionPictureInPicture = _pictureInPicture2.default;
exports.ActionPlayForWork = _playForWork2.default;
exports.ActionPolymer = _polymer2.default;
exports.ActionPowerSettingsNew = _powerSettingsNew2.default;
exports.ActionPregnantWoman = _pregnantWoman2.default;
exports.ActionPrint = _print2.default;
exports.ActionQueryBuilder = _queryBuilder2.default;
exports.ActionQuestionAnswer = _questionAnswer2.default;
exports.ActionReceipt = _receipt2.default;
exports.ActionRecordVoiceOver = _recordVoiceOver2.default;
exports.ActionRedeem = _redeem2.default;
exports.ActionRemoveShoppingCart = _removeShoppingCart2.default;
exports.ActionReorder = _reorder2.default;
exports.ActionReportProblem = _reportProblem2.default;
exports.ActionRestorePage = _restorePage2.default;
exports.ActionRestore = _restore2.default;
exports.ActionRoom = _room2.default;
exports.ActionRoundedCorner = _roundedCorner2.default;
exports.ActionRowing = _rowing2.default;
exports.ActionSchedule = _schedule2.default;
exports.ActionSearch = _search2.default;
exports.ActionSettingsApplications = _settingsApplications2.default;
exports.ActionSettingsBackupRestore = _settingsBackupRestore2.default;
exports.ActionSettingsBluetooth = _settingsBluetooth2.default;
exports.ActionSettingsBrightness = _settingsBrightness2.default;
exports.ActionSettingsCell = _settingsCell2.default;
exports.ActionSettingsEthernet = _settingsEthernet2.default;
exports.ActionSettingsInputAntenna = _settingsInputAntenna2.default;
exports.ActionSettingsInputComponent = _settingsInputComponent2.default;
exports.ActionSettingsInputComposite = _settingsInputComposite2.default;
exports.ActionSettingsInputHdmi = _settingsInputHdmi2.default;
exports.ActionSettingsInputSvideo = _settingsInputSvideo2.default;
exports.ActionSettingsOverscan = _settingsOverscan2.default;
exports.ActionSettingsPhone = _settingsPhone2.default;
exports.ActionSettingsPower = _settingsPower2.default;
exports.ActionSettingsRemote = _settingsRemote2.default;
exports.ActionSettingsVoice = _settingsVoice2.default;
exports.ActionSettings = _settings2.default;
exports.ActionShopTwo = _shopTwo2.default;
exports.ActionShop = _shop2.default;
exports.ActionShoppingBasket = _shoppingBasket2.default;
exports.ActionShoppingCart = _shoppingCart2.default;
exports.ActionSpeakerNotesOff = _speakerNotesOff2.default;
exports.ActionSpeakerNotes = _speakerNotes2.default;
exports.ActionSpellcheck = _spellcheck2.default;
exports.ActionStars = _stars2.default;
exports.ActionStore = _store2.default;
exports.ActionSubject = _subject2.default;
exports.ActionSupervisorAccount = _supervisorAccount2.default;
exports.ActionSwapHoriz = _swapHoriz2.default;
exports.ActionSwapVert = _swapVert2.default;
exports.ActionSwapVerticalCircle = _swapVerticalCircle2.default;
exports.ActionSystemUpdateAlt = _systemUpdateAlt2.default;
exports.ActionTabUnselected = _tabUnselected2.default;
exports.ActionTab = _tab2.default;
exports.ActionTheaters = _theaters2.default;
exports.ActionThreeDRotation = _threeDRotation2.default;
exports.ActionThumbDown = _thumbDown2.default;
exports.ActionThumbUp = _thumbUp2.default;
exports.ActionThumbsUpDown = _thumbsUpDown2.default;
exports.ActionTimeline = _timeline2.default;
exports.ActionToc = _toc2.default;
exports.ActionToday = _today2.default;
exports.ActionToll = _toll2.default;
exports.ActionTouchApp = _touchApp2.default;
exports.ActionTrackChanges = _trackChanges2.default;
exports.ActionTranslate = _translate2.default;
exports.ActionTrendingDown = _trendingDown2.default;
exports.ActionTrendingFlat = _trendingFlat2.default;
exports.ActionTrendingUp = _trendingUp2.default;
exports.ActionTurnedInNot = _turnedInNot2.default;
exports.ActionTurnedIn = _turnedIn2.default;
exports.ActionUpdate = _update2.default;
exports.ActionVerifiedUser = _verifiedUser2.default;
exports.ActionViewAgenda = _viewAgenda2.default;
exports.ActionViewArray = _viewArray2.default;
exports.ActionViewCarousel = _viewCarousel2.default;
exports.ActionViewColumn = _viewColumn2.default;
exports.ActionViewDay = _viewDay2.default;
exports.ActionViewHeadline = _viewHeadline2.default;
exports.ActionViewList = _viewList2.default;
exports.ActionViewModule = _viewModule2.default;
exports.ActionViewQuilt = _viewQuilt2.default;
exports.ActionViewStream = _viewStream2.default;
exports.ActionViewWeek = _viewWeek2.default;
exports.ActionVisibilityOff = _visibilityOff2.default;
exports.ActionVisibility = _visibility2.default;
exports.ActionWatchLater = _watchLater2.default;
exports.ActionWork = _work2.default;
exports.ActionYoutubeSearchedFor = _youtubeSearchedFor2.default;
exports.ActionZoomIn = _zoomIn2.default;
exports.ActionZoomOut = _zoomOut2.default;
exports.AlertAddAlert = _addAlert2.default;
exports.AlertErrorOutline = _errorOutline2.default;
exports.AlertError = _error2.default;
exports.AlertWarning = _warning2.default;
exports.AvAddToQueue = _addToQueue2.default;
exports.AvAirplay = _airplay2.default;
exports.AvAlbum = _album2.default;
exports.AvArtTrack = _artTrack2.default;
exports.AvAvTimer = _avTimer2.default;
exports.AvBrandingWatermark = _brandingWatermark2.default;
exports.AvCallToAction = _callToAction2.default;
exports.AvClosedCaption = _closedCaption2.default;
exports.AvEqualizer = _equalizer2.default;
exports.AvExplicit = _explicit2.default;
exports.AvFastForward = _fastForward2.default;
exports.AvFastRewind = _fastRewind2.default;
exports.AvFeaturedPlayList = _featuredPlayList2.default;
exports.AvFeaturedVideo = _featuredVideo2.default;
exports.AvFiberDvr = _fiberDvr2.default;
exports.AvFiberManualRecord = _fiberManualRecord2.default;
exports.AvFiberNew = _fiberNew2.default;
exports.AvFiberPin = _fiberPin2.default;
exports.AvFiberSmartRecord = _fiberSmartRecord2.default;
exports.AvForward10 = _forward2.default;
exports.AvForward30 = _forward4.default;
exports.AvForward5 = _forward6.default;
exports.AvGames = _games2.default;
exports.AvHd = _hd2.default;
exports.AvHearing = _hearing2.default;
exports.AvHighQuality = _highQuality2.default;
exports.AvLibraryAdd = _libraryAdd2.default;
exports.AvLibraryBooks = _libraryBooks2.default;
exports.AvLibraryMusic = _libraryMusic2.default;
exports.AvLoop = _loop2.default;
exports.AvMicNone = _micNone2.default;
exports.AvMicOff = _micOff2.default;
exports.AvMic = _mic2.default;
exports.AvMovie = _movie2.default;
exports.AvMusicVideo = _musicVideo2.default;
exports.AvNewReleases = _newReleases2.default;
exports.AvNotInterested = _notInterested2.default;
exports.AvNote = _note2.default;
exports.AvPauseCircleFilled = _pauseCircleFilled2.default;
exports.AvPauseCircleOutline = _pauseCircleOutline2.default;
exports.AvPause = _pause2.default;
exports.AvPlayArrow = _playArrow2.default;
exports.AvPlayCircleFilled = _playCircleFilled2.default;
exports.AvPlayCircleOutline = _playCircleOutline2.default;
exports.AvPlaylistAddCheck = _playlistAddCheck2.default;
exports.AvPlaylistAdd = _playlistAdd2.default;
exports.AvPlaylistPlay = _playlistPlay2.default;
exports.AvQueueMusic = _queueMusic2.default;
exports.AvQueuePlayNext = _queuePlayNext2.default;
exports.AvQueue = _queue2.default;
exports.AvRadio = _radio2.default;
exports.AvRecentActors = _recentActors2.default;
exports.AvRemoveFromQueue = _removeFromQueue2.default;
exports.AvRepeatOne = _repeatOne2.default;
exports.AvRepeat = _repeat2.default;
exports.AvReplay10 = _replay2.default;
exports.AvReplay30 = _replay4.default;
exports.AvReplay5 = _replay6.default;
exports.AvReplay = _replay8.default;
exports.AvShuffle = _shuffle2.default;
exports.AvSkipNext = _skipNext2.default;
exports.AvSkipPrevious = _skipPrevious2.default;
exports.AvSlowMotionVideo = _slowMotionVideo2.default;
exports.AvSnooze = _snooze2.default;
exports.AvSortByAlpha = _sortByAlpha2.default;
exports.AvStop = _stop2.default;
exports.AvSubscriptions = _subscriptions2.default;
exports.AvSubtitles = _subtitles2.default;
exports.AvSurroundSound = _surroundSound2.default;
exports.AvVideoCall = _videoCall2.default;
exports.AvVideoLabel = _videoLabel2.default;
exports.AvVideoLibrary = _videoLibrary2.default;
exports.AvVideocamOff = _videocamOff2.default;
exports.AvVideocam = _videocam2.default;
exports.AvVolumeDown = _volumeDown2.default;
exports.AvVolumeMute = _volumeMute2.default;
exports.AvVolumeOff = _volumeOff2.default;
exports.AvVolumeUp = _volumeUp2.default;
exports.AvWebAsset = _webAsset2.default;
exports.AvWeb = _web2.default;
exports.CommunicationBusiness = _business2.default;
exports.CommunicationCallEnd = _callEnd2.default;
exports.CommunicationCallMade = _callMade2.default;
exports.CommunicationCallMerge = _callMerge2.default;
exports.CommunicationCallMissedOutgoing = _callMissedOutgoing2.default;
exports.CommunicationCallMissed = _callMissed2.default;
exports.CommunicationCallReceived = _callReceived2.default;
exports.CommunicationCallSplit = _callSplit2.default;
exports.CommunicationCall = _call2.default;
exports.CommunicationChatBubbleOutline = _chatBubbleOutline2.default;
exports.CommunicationChatBubble = _chatBubble2.default;
exports.CommunicationChat = _chat2.default;
exports.CommunicationClearAll = _clearAll2.default;
exports.CommunicationComment = _comment2.default;
exports.CommunicationContactMail = _contactMail2.default;
exports.CommunicationContactPhone = _contactPhone2.default;
exports.CommunicationContacts = _contacts2.default;
exports.CommunicationDialerSip = _dialerSip2.default;
exports.CommunicationDialpad = _dialpad2.default;
exports.CommunicationEmail = _email2.default;
exports.CommunicationForum = _forum2.default;
exports.CommunicationImportContacts = _importContacts2.default;
exports.CommunicationImportExport = _importExport2.default;
exports.CommunicationInvertColorsOff = _invertColorsOff2.default;
exports.CommunicationLiveHelp = _liveHelp2.default;
exports.CommunicationLocationOff = _locationOff2.default;
exports.CommunicationLocationOn = _locationOn2.default;
exports.CommunicationMailOutline = _mailOutline2.default;
exports.CommunicationMessage = _message2.default;
exports.CommunicationNoSim = _noSim2.default;
exports.CommunicationPhone = _phone2.default;
exports.CommunicationPhonelinkErase = _phonelinkErase2.default;
exports.CommunicationPhonelinkLock = _phonelinkLock2.default;
exports.CommunicationPhonelinkRing = _phonelinkRing2.default;
exports.CommunicationPhonelinkSetup = _phonelinkSetup2.default;
exports.CommunicationPortableWifiOff = _portableWifiOff2.default;
exports.CommunicationPresentToAll = _presentToAll2.default;
exports.CommunicationRingVolume = _ringVolume2.default;
exports.CommunicationRssFeed = _rssFeed2.default;
exports.CommunicationScreenShare = _screenShare2.default;
exports.CommunicationSpeakerPhone = _speakerPhone2.default;
exports.CommunicationStayCurrentLandscape = _stayCurrentLandscape2.default;
exports.CommunicationStayCurrentPortrait = _stayCurrentPortrait2.default;
exports.CommunicationStayPrimaryLandscape = _stayPrimaryLandscape2.default;
exports.CommunicationStayPrimaryPortrait = _stayPrimaryPortrait2.default;
exports.CommunicationStopScreenShare = _stopScreenShare2.default;
exports.CommunicationSwapCalls = _swapCalls2.default;
exports.CommunicationTextsms = _textsms2.default;
exports.CommunicationVoicemail = _voicemail2.default;
exports.CommunicationVpnKey = _vpnKey2.default;
exports.ContentAddBox = _addBox2.default;
exports.ContentAddCircleOutline = _addCircleOutline2.default;
exports.ContentAddCircle = _addCircle2.default;
exports.ContentAdd = _add2.default;
exports.ContentArchive = _archive2.default;
exports.ContentBackspace = _backspace2.default;
exports.ContentBlock = _block2.default;
exports.ContentClear = _clear2.default;
exports.ContentContentCopy = _contentCopy2.default;
exports.ContentContentCut = _contentCut2.default;
exports.ContentContentPaste = _contentPaste2.default;
exports.ContentCreate = _create2.default;
exports.ContentDeleteSweep = _deleteSweep2.default;
exports.ContentDrafts = _drafts2.default;
exports.ContentFilterList = _filterList2.default;
exports.ContentFlag = _flag2.default;
exports.ContentFontDownload = _fontDownload2.default;
exports.ContentForward = _forward8.default;
exports.ContentGesture = _gesture2.default;
exports.ContentInbox = _inbox2.default;
exports.ContentLink = _link2.default;
exports.ContentLowPriority = _lowPriority2.default;
exports.ContentMail = _mail2.default;
exports.ContentMarkunread = _markunread2.default;
exports.ContentMoveToInbox = _moveToInbox2.default;
exports.ContentNextWeek = _nextWeek2.default;
exports.ContentRedo = _redo2.default;
exports.ContentRemoveCircleOutline = _removeCircleOutline2.default;
exports.ContentRemoveCircle = _removeCircle2.default;
exports.ContentRemove = _remove2.default;
exports.ContentReplyAll = _replyAll2.default;
exports.ContentReply = _reply2.default;
exports.ContentReport = _report2.default;
exports.ContentSave = _save2.default;
exports.ContentSelectAll = _selectAll2.default;
exports.ContentSend = _send2.default;
exports.ContentSort = _sort2.default;
exports.ContentTextFormat = _textFormat2.default;
exports.ContentUnarchive = _unarchive2.default;
exports.ContentUndo = _undo2.default;
exports.ContentWeekend = _weekend2.default;
exports.DeviceAccessAlarm = _accessAlarm2.default;
exports.DeviceAccessAlarms = _accessAlarms2.default;
exports.DeviceAccessTime = _accessTime2.default;
exports.DeviceAddAlarm = _addAlarm2.default;
exports.DeviceAirplanemodeActive = _airplanemodeActive2.default;
exports.DeviceAirplanemodeInactive = _airplanemodeInactive2.default;
exports.DeviceBattery20 = _battery2.default;
exports.DeviceBattery30 = _battery4.default;
exports.DeviceBattery50 = _battery6.default;
exports.DeviceBattery60 = _battery8.default;
exports.DeviceBattery80 = _battery10.default;
exports.DeviceBattery90 = _battery12.default;
exports.DeviceBatteryAlert = _batteryAlert2.default;
exports.DeviceBatteryCharging20 = _batteryCharging2.default;
exports.DeviceBatteryCharging30 = _batteryCharging4.default;
exports.DeviceBatteryCharging50 = _batteryCharging6.default;
exports.DeviceBatteryCharging60 = _batteryCharging8.default;
exports.DeviceBatteryCharging80 = _batteryCharging10.default;
exports.DeviceBatteryCharging90 = _batteryCharging12.default;
exports.DeviceBatteryChargingFull = _batteryChargingFull2.default;
exports.DeviceBatteryFull = _batteryFull2.default;
exports.DeviceBatteryStd = _batteryStd2.default;
exports.DeviceBatteryUnknown = _batteryUnknown2.default;
exports.DeviceBluetoothConnected = _bluetoothConnected2.default;
exports.DeviceBluetoothDisabled = _bluetoothDisabled2.default;
exports.DeviceBluetoothSearching = _bluetoothSearching2.default;
exports.DeviceBluetooth = _bluetooth2.default;
exports.DeviceBrightnessAuto = _brightnessAuto2.default;
exports.DeviceBrightnessHigh = _brightnessHigh2.default;
exports.DeviceBrightnessLow = _brightnessLow2.default;
exports.DeviceBrightnessMedium = _brightnessMedium2.default;
exports.DeviceDataUsage = _dataUsage2.default;
exports.DeviceDeveloperMode = _developerMode2.default;
exports.DeviceDevices = _devices2.default;
exports.DeviceDvr = _dvr2.default;
exports.DeviceGpsFixed = _gpsFixed2.default;
exports.DeviceGpsNotFixed = _gpsNotFixed2.default;
exports.DeviceGpsOff = _gpsOff2.default;
exports.DeviceGraphicEq = _graphicEq2.default;
exports.DeviceLocationDisabled = _locationDisabled2.default;
exports.DeviceLocationSearching = _locationSearching2.default;
exports.DeviceNetworkCell = _networkCell2.default;
exports.DeviceNetworkWifi = _networkWifi2.default;
exports.DeviceNfc = _nfc2.default;
exports.DeviceScreenLockLandscape = _screenLockLandscape2.default;
exports.DeviceScreenLockPortrait = _screenLockPortrait2.default;
exports.DeviceScreenLockRotation = _screenLockRotation2.default;
exports.DeviceScreenRotation = _screenRotation2.default;
exports.DeviceSdStorage = _sdStorage2.default;
exports.DeviceSettingsSystemDaydream = _settingsSystemDaydream2.default;
exports.DeviceSignalCellular0Bar = _signalCellular0Bar2.default;
exports.DeviceSignalCellular1Bar = _signalCellular1Bar2.default;
exports.DeviceSignalCellular2Bar = _signalCellular2Bar2.default;
exports.DeviceSignalCellular3Bar = _signalCellular3Bar2.default;
exports.DeviceSignalCellular4Bar = _signalCellular4Bar2.default;
exports.DeviceSignalCellularConnectedNoInternet0Bar = _signalCellularConnectedNoInternet0Bar2.default;
exports.DeviceSignalCellularConnectedNoInternet1Bar = _signalCellularConnectedNoInternet1Bar2.default;
exports.DeviceSignalCellularConnectedNoInternet2Bar = _signalCellularConnectedNoInternet2Bar2.default;
exports.DeviceSignalCellularConnectedNoInternet3Bar = _signalCellularConnectedNoInternet3Bar2.default;
exports.DeviceSignalCellularConnectedNoInternet4Bar = _signalCellularConnectedNoInternet4Bar2.default;
exports.DeviceSignalCellularNoSim = _signalCellularNoSim2.default;
exports.DeviceSignalCellularNull = _signalCellularNull2.default;
exports.DeviceSignalCellularOff = _signalCellularOff2.default;
exports.DeviceSignalWifi0Bar = _signalWifi0Bar2.default;
exports.DeviceSignalWifi1BarLock = _signalWifi1BarLock2.default;
exports.DeviceSignalWifi1Bar = _signalWifi1Bar2.default;
exports.DeviceSignalWifi2BarLock = _signalWifi2BarLock2.default;
exports.DeviceSignalWifi2Bar = _signalWifi2Bar2.default;
exports.DeviceSignalWifi3BarLock = _signalWifi3BarLock2.default;
exports.DeviceSignalWifi3Bar = _signalWifi3Bar2.default;
exports.DeviceSignalWifi4BarLock = _signalWifi4BarLock2.default;
exports.DeviceSignalWifi4Bar = _signalWifi4Bar2.default;
exports.DeviceSignalWifiOff = _signalWifiOff2.default;
exports.DeviceStorage = _storage2.default;
exports.DeviceUsb = _usb2.default;
exports.DeviceWallpaper = _wallpaper2.default;
exports.DeviceWidgets = _widgets2.default;
exports.DeviceWifiLock = _wifiLock2.default;
exports.DeviceWifiTethering = _wifiTethering2.default;
exports.EditorAttachFile = _attachFile2.default;
exports.EditorAttachMoney = _attachMoney2.default;
exports.EditorBorderAll = _borderAll2.default;
exports.EditorBorderBottom = _borderBottom2.default;
exports.EditorBorderClear = _borderClear2.default;
exports.EditorBorderColor = _borderColor2.default;
exports.EditorBorderHorizontal = _borderHorizontal2.default;
exports.EditorBorderInner = _borderInner2.default;
exports.EditorBorderLeft = _borderLeft2.default;
exports.EditorBorderOuter = _borderOuter2.default;
exports.EditorBorderRight = _borderRight2.default;
exports.EditorBorderStyle = _borderStyle2.default;
exports.EditorBorderTop = _borderTop2.default;
exports.EditorBorderVertical = _borderVertical2.default;
exports.EditorBubbleChart = _bubbleChart2.default;
exports.EditorDragHandle = _dragHandle2.default;
exports.EditorFormatAlignCenter = _formatAlignCenter2.default;
exports.EditorFormatAlignJustify = _formatAlignJustify2.default;
exports.EditorFormatAlignLeft = _formatAlignLeft2.default;
exports.EditorFormatAlignRight = _formatAlignRight2.default;
exports.EditorFormatBold = _formatBold2.default;
exports.EditorFormatClear = _formatClear2.default;
exports.EditorFormatColorFill = _formatColorFill2.default;
exports.EditorFormatColorReset = _formatColorReset2.default;
exports.EditorFormatColorText = _formatColorText2.default;
exports.EditorFormatIndentDecrease = _formatIndentDecrease2.default;
exports.EditorFormatIndentIncrease = _formatIndentIncrease2.default;
exports.EditorFormatItalic = _formatItalic2.default;
exports.EditorFormatLineSpacing = _formatLineSpacing2.default;
exports.EditorFormatListBulleted = _formatListBulleted2.default;
exports.EditorFormatListNumbered = _formatListNumbered2.default;
exports.EditorFormatPaint = _formatPaint2.default;
exports.EditorFormatQuote = _formatQuote2.default;
exports.EditorFormatShapes = _formatShapes2.default;
exports.EditorFormatSize = _formatSize2.default;
exports.EditorFormatStrikethrough = _formatStrikethrough2.default;
exports.EditorFormatTextdirectionLToR = _formatTextdirectionLToR2.default;
exports.EditorFormatTextdirectionRToL = _formatTextdirectionRToL2.default;
exports.EditorFormatUnderlined = _formatUnderlined2.default;
exports.EditorFunctions = _functions2.default;
exports.EditorHighlight = _highlight2.default;
exports.EditorInsertChart = _insertChart2.default;
exports.EditorInsertComment = _insertComment2.default;
exports.EditorInsertDriveFile = _insertDriveFile2.default;
exports.EditorInsertEmoticon = _insertEmoticon2.default;
exports.EditorInsertInvitation = _insertInvitation2.default;
exports.EditorInsertLink = _insertLink2.default;
exports.EditorInsertPhoto = _insertPhoto2.default;
exports.EditorLinearScale = _linearScale2.default;
exports.EditorMergeType = _mergeType2.default;
exports.EditorModeComment = _modeComment2.default;
exports.EditorModeEdit = _modeEdit2.default;
exports.EditorMonetizationOn = _monetizationOn2.default;
exports.EditorMoneyOff = _moneyOff2.default;
exports.EditorMultilineChart = _multilineChart2.default;
exports.EditorPieChartOutlined = _pieChartOutlined2.default;
exports.EditorPieChart = _pieChart2.default;
exports.EditorPublish = _publish2.default;
exports.EditorShortText = _shortText2.default;
exports.EditorShowChart = _showChart2.default;
exports.EditorSpaceBar = _spaceBar2.default;
exports.EditorStrikethroughS = _strikethroughS2.default;
exports.EditorTextFields = _textFields2.default;
exports.EditorTitle = _title2.default;
exports.EditorVerticalAlignBottom = _verticalAlignBottom2.default;
exports.EditorVerticalAlignCenter = _verticalAlignCenter2.default;
exports.EditorVerticalAlignTop = _verticalAlignTop2.default;
exports.EditorWrapText = _wrapText2.default;
exports.FileAttachment = _attachment2.default;
exports.FileCloudCircle = _cloudCircle2.default;
exports.FileCloudDone = _cloudDone2.default;
exports.FileCloudDownload = _cloudDownload2.default;
exports.FileCloudOff = _cloudOff2.default;
exports.FileCloudQueue = _cloudQueue2.default;
exports.FileCloudUpload = _cloudUpload2.default;
exports.FileCloud = _cloud2.default;
exports.FileCreateNewFolder = _createNewFolder2.default;
exports.FileFileDownload = _fileDownload2.default;
exports.FileFileUpload = _fileUpload2.default;
exports.FileFolderOpen = _folderOpen2.default;
exports.FileFolderShared = _folderShared2.default;
exports.FileFolder = _folder2.default;
exports.HardwareCastConnected = _castConnected2.default;
exports.HardwareCast = _cast2.default;
exports.HardwareComputer = _computer2.default;
exports.HardwareDesktopMac = _desktopMac2.default;
exports.HardwareDesktopWindows = _desktopWindows2.default;
exports.HardwareDeveloperBoard = _developerBoard2.default;
exports.HardwareDeviceHub = _deviceHub2.default;
exports.HardwareDevicesOther = _devicesOther2.default;
exports.HardwareDock = _dock2.default;
exports.HardwareGamepad = _gamepad2.default;
exports.HardwareHeadsetMic = _headsetMic2.default;
exports.HardwareHeadset = _headset2.default;
exports.HardwareKeyboardArrowDown = _keyboardArrowDown2.default;
exports.HardwareKeyboardArrowLeft = _keyboardArrowLeft2.default;
exports.HardwareKeyboardArrowRight = _keyboardArrowRight2.default;
exports.HardwareKeyboardArrowUp = _keyboardArrowUp2.default;
exports.HardwareKeyboardBackspace = _keyboardBackspace2.default;
exports.HardwareKeyboardCapslock = _keyboardCapslock2.default;
exports.HardwareKeyboardHide = _keyboardHide2.default;
exports.HardwareKeyboardReturn = _keyboardReturn2.default;
exports.HardwareKeyboardTab = _keyboardTab2.default;
exports.HardwareKeyboardVoice = _keyboardVoice2.default;
exports.HardwareKeyboard = _keyboard2.default;
exports.HardwareLaptopChromebook = _laptopChromebook2.default;
exports.HardwareLaptopMac = _laptopMac2.default;
exports.HardwareLaptopWindows = _laptopWindows2.default;
exports.HardwareLaptop = _laptop2.default;
exports.HardwareMemory = _memory2.default;
exports.HardwareMouse = _mouse2.default;
exports.HardwarePhoneAndroid = _phoneAndroid2.default;
exports.HardwarePhoneIphone = _phoneIphone2.default;
exports.HardwarePhonelinkOff = _phonelinkOff2.default;
exports.HardwarePhonelink = _phonelink2.default;
exports.HardwarePowerInput = _powerInput2.default;
exports.HardwareRouter = _router2.default;
exports.HardwareScanner = _scanner2.default;
exports.HardwareSecurity = _security2.default;
exports.HardwareSimCard = _simCard2.default;
exports.HardwareSmartphone = _smartphone2.default;
exports.HardwareSpeakerGroup = _speakerGroup2.default;
exports.HardwareSpeaker = _speaker2.default;
exports.HardwareTabletAndroid = _tabletAndroid2.default;
exports.HardwareTabletMac = _tabletMac2.default;
exports.HardwareTablet = _tablet2.default;
exports.HardwareToys = _toys2.default;
exports.HardwareTv = _tv2.default;
exports.HardwareVideogameAsset = _videogameAsset2.default;
exports.HardwareWatch = _watch2.default;
exports.ImageAddAPhoto = _addAPhoto2.default;
exports.ImageAddToPhotos = _addToPhotos2.default;
exports.ImageAdjust = _adjust2.default;
exports.ImageAssistantPhoto = _assistantPhoto2.default;
exports.ImageAssistant = _assistant2.default;
exports.ImageAudiotrack = _audiotrack2.default;
exports.ImageBlurCircular = _blurCircular2.default;
exports.ImageBlurLinear = _blurLinear2.default;
exports.ImageBlurOff = _blurOff2.default;
exports.ImageBlurOn = _blurOn2.default;
exports.ImageBrightness1 = _brightness2.default;
exports.ImageBrightness2 = _brightness4.default;
exports.ImageBrightness3 = _brightness6.default;
exports.ImageBrightness4 = _brightness8.default;
exports.ImageBrightness5 = _brightness10.default;
exports.ImageBrightness6 = _brightness12.default;
exports.ImageBrightness7 = _brightness14.default;
exports.ImageBrokenImage = _brokenImage2.default;
exports.ImageBrush = _brush2.default;
exports.ImageBurstMode = _burstMode2.default;
exports.ImageCameraAlt = _cameraAlt2.default;
exports.ImageCameraFront = _cameraFront2.default;
exports.ImageCameraRear = _cameraRear2.default;
exports.ImageCameraRoll = _cameraRoll2.default;
exports.ImageCamera = _camera2.default;
exports.ImageCenterFocusStrong = _centerFocusStrong2.default;
exports.ImageCenterFocusWeak = _centerFocusWeak2.default;
exports.ImageCollectionsBookmark = _collectionsBookmark2.default;
exports.ImageCollections = _collections2.default;
exports.ImageColorLens = _colorLens2.default;
exports.ImageColorize = _colorize2.default;
exports.ImageCompare = _compare2.default;
exports.ImageControlPointDuplicate = _controlPointDuplicate2.default;
exports.ImageControlPoint = _controlPoint2.default;
exports.ImageCrop169 = _crop2.default;
exports.ImageCrop32 = _crop4.default;
exports.ImageCrop54 = _crop6.default;
exports.ImageCrop75 = _crop8.default;
exports.ImageCropDin = _cropDin2.default;
exports.ImageCropFree = _cropFree2.default;
exports.ImageCropLandscape = _cropLandscape2.default;
exports.ImageCropOriginal = _cropOriginal2.default;
exports.ImageCropPortrait = _cropPortrait2.default;
exports.ImageCropRotate = _cropRotate2.default;
exports.ImageCropSquare = _cropSquare2.default;
exports.ImageCrop = _crop10.default;
exports.ImageDehaze = _dehaze2.default;
exports.ImageDetails = _details2.default;
exports.ImageEdit = _edit2.default;
exports.ImageExposureNeg1 = _exposureNeg2.default;
exports.ImageExposureNeg2 = _exposureNeg4.default;
exports.ImageExposurePlus1 = _exposurePlus2.default;
exports.ImageExposurePlus2 = _exposurePlus4.default;
exports.ImageExposureZero = _exposureZero2.default;
exports.ImageExposure = _exposure2.default;
exports.ImageFilter1 = _filter2.default;
exports.ImageFilter2 = _filter4.default;
exports.ImageFilter3 = _filter6.default;
exports.ImageFilter4 = _filter8.default;
exports.ImageFilter5 = _filter10.default;
exports.ImageFilter6 = _filter12.default;
exports.ImageFilter7 = _filter14.default;
exports.ImageFilter8 = _filter16.default;
exports.ImageFilter9Plus = _filter9Plus2.default;
exports.ImageFilter9 = _filter18.default;
exports.ImageFilterBAndW = _filterBAndW2.default;
exports.ImageFilterCenterFocus = _filterCenterFocus2.default;
exports.ImageFilterDrama = _filterDrama2.default;
exports.ImageFilterFrames = _filterFrames2.default;
exports.ImageFilterHdr = _filterHdr2.default;
exports.ImageFilterNone = _filterNone2.default;
exports.ImageFilterTiltShift = _filterTiltShift2.default;
exports.ImageFilterVintage = _filterVintage2.default;
exports.ImageFilter = _filter20.default;
exports.ImageFlare = _flare2.default;
exports.ImageFlashAuto = _flashAuto2.default;
exports.ImageFlashOff = _flashOff2.default;
exports.ImageFlashOn = _flashOn2.default;
exports.ImageFlip = _flip2.default;
exports.ImageGradient = _gradient2.default;
exports.ImageGrain = _grain2.default;
exports.ImageGridOff = _gridOff2.default;
exports.ImageGridOn = _gridOn2.default;
exports.ImageHdrOff = _hdrOff2.default;
exports.ImageHdrOn = _hdrOn2.default;
exports.ImageHdrStrong = _hdrStrong2.default;
exports.ImageHdrWeak = _hdrWeak2.default;
exports.ImageHealing = _healing2.default;
exports.ImageImageAspectRatio = _imageAspectRatio2.default;
exports.ImageImage = _image2.default;
exports.ImageIso = _iso2.default;
exports.ImageLandscape = _landscape2.default;
exports.ImageLeakAdd = _leakAdd2.default;
exports.ImageLeakRemove = _leakRemove2.default;
exports.ImageLens = _lens2.default;
exports.ImageLinkedCamera = _linkedCamera2.default;
exports.ImageLooks3 = _looks2.default;
exports.ImageLooks4 = _looks4.default;
exports.ImageLooks5 = _looks6.default;
exports.ImageLooks6 = _looks8.default;
exports.ImageLooksOne = _looksOne2.default;
exports.ImageLooksTwo = _looksTwo2.default;
exports.ImageLooks = _looks10.default;
exports.ImageLoupe = _loupe2.default;
exports.ImageMonochromePhotos = _monochromePhotos2.default;
exports.ImageMovieCreation = _movieCreation2.default;
exports.ImageMovieFilter = _movieFilter2.default;
exports.ImageMusicNote = _musicNote2.default;
exports.ImageNaturePeople = _naturePeople2.default;
exports.ImageNature = _nature2.default;
exports.ImageNavigateBefore = _navigateBefore2.default;
exports.ImageNavigateNext = _navigateNext2.default;
exports.ImagePalette = _palette2.default;
exports.ImagePanoramaFishEye = _panoramaFishEye2.default;
exports.ImagePanoramaHorizontal = _panoramaHorizontal2.default;
exports.ImagePanoramaVertical = _panoramaVertical2.default;
exports.ImagePanoramaWideAngle = _panoramaWideAngle2.default;
exports.ImagePanorama = _panorama2.default;
exports.ImagePhotoAlbum = _photoAlbum2.default;
exports.ImagePhotoCamera = _photoCamera2.default;
exports.ImagePhotoFilter = _photoFilter2.default;
exports.ImagePhotoLibrary = _photoLibrary2.default;
exports.ImagePhotoSizeSelectActual = _photoSizeSelectActual2.default;
exports.ImagePhotoSizeSelectLarge = _photoSizeSelectLarge2.default;
exports.ImagePhotoSizeSelectSmall = _photoSizeSelectSmall2.default;
exports.ImagePhoto = _photo2.default;
exports.ImagePictureAsPdf = _pictureAsPdf2.default;
exports.ImagePortrait = _portrait2.default;
exports.ImageRemoveRedEye = _removeRedEye2.default;
exports.ImageRotate90DegreesCcw = _rotate90DegreesCcw2.default;
exports.ImageRotateLeft = _rotateLeft2.default;
exports.ImageRotateRight = _rotateRight2.default;
exports.ImageSlideshow = _slideshow2.default;
exports.ImageStraighten = _straighten2.default;
exports.ImageStyle = _style2.default;
exports.ImageSwitchCamera = _switchCamera2.default;
exports.ImageSwitchVideo = _switchVideo2.default;
exports.ImageTagFaces = _tagFaces2.default;
exports.ImageTexture = _texture2.default;
exports.ImageTimelapse = _timelapse2.default;
exports.ImageTimer10 = _timer2.default;
exports.ImageTimer3 = _timer4.default;
exports.ImageTimerOff = _timerOff2.default;
exports.ImageTimer = _timer6.default;
exports.ImageTonality = _tonality2.default;
exports.ImageTransform = _transform2.default;
exports.ImageTune = _tune2.default;
exports.ImageViewComfy = _viewComfy2.default;
exports.ImageViewCompact = _viewCompact2.default;
exports.ImageVignette = _vignette2.default;
exports.ImageWbAuto = _wbAuto2.default;
exports.ImageWbCloudy = _wbCloudy2.default;
exports.ImageWbIncandescent = _wbIncandescent2.default;
exports.ImageWbIridescent = _wbIridescent2.default;
exports.ImageWbSunny = _wbSunny2.default;
exports.MapsAddLocation = _addLocation2.default;
exports.MapsBeenhere = _beenhere2.default;
exports.MapsDirectionsBike = _directionsBike2.default;
exports.MapsDirectionsBoat = _directionsBoat2.default;
exports.MapsDirectionsBus = _directionsBus2.default;
exports.MapsDirectionsCar = _directionsCar2.default;
exports.MapsDirectionsRailway = _directionsRailway2.default;
exports.MapsDirectionsRun = _directionsRun2.default;
exports.MapsDirectionsSubway = _directionsSubway2.default;
exports.MapsDirectionsTransit = _directionsTransit2.default;
exports.MapsDirectionsWalk = _directionsWalk2.default;
exports.MapsDirections = _directions2.default;
exports.MapsEditLocation = _editLocation2.default;
exports.MapsEvStation = _evStation2.default;
exports.MapsFlight = _flight2.default;
exports.MapsHotel = _hotel2.default;
exports.MapsLayersClear = _layersClear2.default;
exports.MapsLayers = _layers2.default;
exports.MapsLocalActivity = _localActivity2.default;
exports.MapsLocalAirport = _localAirport2.default;
exports.MapsLocalAtm = _localAtm2.default;
exports.MapsLocalBar = _localBar2.default;
exports.MapsLocalCafe = _localCafe2.default;
exports.MapsLocalCarWash = _localCarWash2.default;
exports.MapsLocalConvenienceStore = _localConvenienceStore2.default;
exports.MapsLocalDining = _localDining2.default;
exports.MapsLocalDrink = _localDrink2.default;
exports.MapsLocalFlorist = _localFlorist2.default;
exports.MapsLocalGasStation = _localGasStation2.default;
exports.MapsLocalGroceryStore = _localGroceryStore2.default;
exports.MapsLocalHospital = _localHospital2.default;
exports.MapsLocalHotel = _localHotel2.default;
exports.MapsLocalLaundryService = _localLaundryService2.default;
exports.MapsLocalLibrary = _localLibrary2.default;
exports.MapsLocalMall = _localMall2.default;
exports.MapsLocalMovies = _localMovies2.default;
exports.MapsLocalOffer = _localOffer2.default;
exports.MapsLocalParking = _localParking2.default;
exports.MapsLocalPharmacy = _localPharmacy2.default;
exports.MapsLocalPhone = _localPhone2.default;
exports.MapsLocalPizza = _localPizza2.default;
exports.MapsLocalPlay = _localPlay2.default;
exports.MapsLocalPostOffice = _localPostOffice2.default;
exports.MapsLocalPrintshop = _localPrintshop2.default;
exports.MapsLocalSee = _localSee2.default;
exports.MapsLocalShipping = _localShipping2.default;
exports.MapsLocalTaxi = _localTaxi2.default;
exports.MapsMap = _map2.default;
exports.MapsMyLocation = _myLocation2.default;
exports.MapsNavigation = _navigation2.default;
exports.MapsNearMe = _nearMe2.default;
exports.MapsPersonPinCircle = _personPinCircle2.default;
exports.MapsPersonPin = _personPin2.default;
exports.MapsPinDrop = _pinDrop2.default;
exports.MapsPlace = _place2.default;
exports.MapsRateReview = _rateReview2.default;
exports.MapsRestaurantMenu = _restaurantMenu2.default;
exports.MapsRestaurant = _restaurant2.default;
exports.MapsSatellite = _satellite2.default;
exports.MapsStoreMallDirectory = _storeMallDirectory2.default;
exports.MapsStreetview = _streetview2.default;
exports.MapsSubway = _subway2.default;
exports.MapsTerrain = _terrain2.default;
exports.MapsTraffic = _traffic2.default;
exports.MapsTrain = _train2.default;
exports.MapsTram = _tram2.default;
exports.MapsTransferWithinAStation = _transferWithinAStation2.default;
exports.MapsZoomOutMap = _zoomOutMap2.default;
exports.NavigationApps = _apps2.default;
exports.NavigationArrowBack = _arrowBack2.default;
exports.NavigationArrowDownward = _arrowDownward2.default;
exports.NavigationArrowDropDownCircle = _arrowDropDownCircle2.default;
exports.NavigationArrowDropDown = _arrowDropDown2.default;
exports.NavigationArrowDropUp = _arrowDropUp2.default;
exports.NavigationArrowForward = _arrowForward2.default;
exports.NavigationArrowUpward = _arrowUpward2.default;
exports.NavigationCancel = _cancel2.default;
exports.NavigationCheck = _check2.default;
exports.NavigationChevronLeft = _chevronLeft2.default;
exports.NavigationChevronRight = _chevronRight2.default;
exports.NavigationClose = _close2.default;
exports.NavigationExpandLess = _expandLess2.default;
exports.NavigationExpandMore = _expandMore2.default;
exports.NavigationFirstPage = _firstPage2.default;
exports.NavigationFullscreenExit = _fullscreenExit2.default;
exports.NavigationFullscreen = _fullscreen2.default;
exports.NavigationLastPage = _lastPage2.default;
exports.NavigationMenu = _menu2.default;
exports.NavigationMoreHoriz = _moreHoriz2.default;
exports.NavigationMoreVert = _moreVert2.default;
exports.NavigationRefresh = _refresh2.default;
exports.NavigationSubdirectoryArrowLeft = _subdirectoryArrowLeft2.default;
exports.NavigationSubdirectoryArrowRight = _subdirectoryArrowRight2.default;
exports.NavigationUnfoldLess = _unfoldLess2.default;
exports.NavigationUnfoldMore = _unfoldMore2.default;
exports.NavigationArrowDropRight = _navigationArrowDropRight2.default;
exports.NotificationAdb = _adb2.default;
exports.NotificationAirlineSeatFlatAngled = _airlineSeatFlatAngled2.default;
exports.NotificationAirlineSeatFlat = _airlineSeatFlat2.default;
exports.NotificationAirlineSeatIndividualSuite = _airlineSeatIndividualSuite2.default;
exports.NotificationAirlineSeatLegroomExtra = _airlineSeatLegroomExtra2.default;
exports.NotificationAirlineSeatLegroomNormal = _airlineSeatLegroomNormal2.default;
exports.NotificationAirlineSeatLegroomReduced = _airlineSeatLegroomReduced2.default;
exports.NotificationAirlineSeatReclineExtra = _airlineSeatReclineExtra2.default;
exports.NotificationAirlineSeatReclineNormal = _airlineSeatReclineNormal2.default;
exports.NotificationBluetoothAudio = _bluetoothAudio2.default;
exports.NotificationConfirmationNumber = _confirmationNumber2.default;
exports.NotificationDiscFull = _discFull2.default;
exports.NotificationDoNotDisturbAlt = _doNotDisturbAlt2.default;
exports.NotificationDoNotDisturbOff = _doNotDisturbOff2.default;
exports.NotificationDoNotDisturbOn = _doNotDisturbOn2.default;
exports.NotificationDoNotDisturb = _doNotDisturb2.default;
exports.NotificationDriveEta = _driveEta2.default;
exports.NotificationEnhancedEncryption = _enhancedEncryption2.default;
exports.NotificationEventAvailable = _eventAvailable2.default;
exports.NotificationEventBusy = _eventBusy2.default;
exports.NotificationEventNote = _eventNote2.default;
exports.NotificationFolderSpecial = _folderSpecial2.default;
exports.NotificationLiveTv = _liveTv2.default;
exports.NotificationMms = _mms2.default;
exports.NotificationMore = _more2.default;
exports.NotificationNetworkCheck = _networkCheck2.default;
exports.NotificationNetworkLocked = _networkLocked2.default;
exports.NotificationNoEncryption = _noEncryption2.default;
exports.NotificationOndemandVideo = _ondemandVideo2.default;
exports.NotificationPersonalVideo = _personalVideo2.default;
exports.NotificationPhoneBluetoothSpeaker = _phoneBluetoothSpeaker2.default;
exports.NotificationPhoneForwarded = _phoneForwarded2.default;
exports.NotificationPhoneInTalk = _phoneInTalk2.default;
exports.NotificationPhoneLocked = _phoneLocked2.default;
exports.NotificationPhoneMissed = _phoneMissed2.default;
exports.NotificationPhonePaused = _phonePaused2.default;
exports.NotificationPower = _power2.default;
exports.NotificationPriorityHigh = _priorityHigh2.default;
exports.NotificationRvHookup = _rvHookup2.default;
exports.NotificationSdCard = _sdCard2.default;
exports.NotificationSimCardAlert = _simCardAlert2.default;
exports.NotificationSmsFailed = _smsFailed2.default;
exports.NotificationSms = _sms2.default;
exports.NotificationSyncDisabled = _syncDisabled2.default;
exports.NotificationSyncProblem = _syncProblem2.default;
exports.NotificationSync = _sync2.default;
exports.NotificationSystemUpdate = _systemUpdate2.default;
exports.NotificationTapAndPlay = _tapAndPlay2.default;
exports.NotificationTimeToLeave = _timeToLeave2.default;
exports.NotificationVibration = _vibration2.default;
exports.NotificationVoiceChat = _voiceChat2.default;
exports.NotificationVpnLock = _vpnLock2.default;
exports.NotificationWc = _wc2.default;
exports.NotificationWifi = _wifi2.default;
exports.PlacesAcUnit = _acUnit2.default;
exports.PlacesAirportShuttle = _airportShuttle2.default;
exports.PlacesAllInclusive = _allInclusive2.default;
exports.PlacesBeachAccess = _beachAccess2.default;
exports.PlacesBusinessCenter = _businessCenter2.default;
exports.PlacesCasino = _casino2.default;
exports.PlacesChildCare = _childCare2.default;
exports.PlacesChildFriendly = _childFriendly2.default;
exports.PlacesFitnessCenter = _fitnessCenter2.default;
exports.PlacesFreeBreakfast = _freeBreakfast2.default;
exports.PlacesGolfCourse = _golfCourse2.default;
exports.PlacesHotTub = _hotTub2.default;
exports.PlacesKitchen = _kitchen2.default;
exports.PlacesPool = _pool2.default;
exports.PlacesRoomService = _roomService2.default;
exports.PlacesRvHookup = _rvHookup4.default;
exports.PlacesSmokeFree = _smokeFree2.default;
exports.PlacesSmokingRooms = _smokingRooms2.default;
exports.PlacesSpa = _spa2.default;
exports.SocialCake = _cake2.default;
exports.SocialDomain = _domain2.default;
exports.SocialGroupAdd = _groupAdd2.default;
exports.SocialGroup = _group2.default;
exports.SocialLocationCity = _locationCity2.default;
exports.SocialMoodBad = _moodBad2.default;
exports.SocialMood = _mood2.default;
exports.SocialNotificationsActive = _notificationsActive2.default;
exports.SocialNotificationsNone = _notificationsNone2.default;
exports.SocialNotificationsOff = _notificationsOff2.default;
exports.SocialNotificationsPaused = _notificationsPaused2.default;
exports.SocialNotifications = _notifications2.default;
exports.SocialPages = _pages2.default;
exports.SocialPartyMode = _partyMode2.default;
exports.SocialPeopleOutline = _peopleOutline2.default;
exports.SocialPeople = _people2.default;
exports.SocialPersonAdd = _personAdd2.default;
exports.SocialPersonOutline = _personOutline2.default;
exports.SocialPerson = _person2.default;
exports.SocialPlusOne = _plusOne2.default;
exports.SocialPoll = _poll2.default;
exports.SocialPublic = _public2.default;
exports.SocialSchool = _school2.default;
exports.SocialSentimentDissatisfied = _sentimentDissatisfied2.default;
exports.SocialSentimentNeutral = _sentimentNeutral2.default;
exports.SocialSentimentSatisfied = _sentimentSatisfied2.default;
exports.SocialSentimentVeryDissatisfied = _sentimentVeryDissatisfied2.default;
exports.SocialSentimentVerySatisfied = _sentimentVerySatisfied2.default;
exports.SocialShare = _share2.default;
exports.SocialWhatshot = _whatshot2.default;
exports.ToggleCheckBoxOutlineBlank = _checkBoxOutlineBlank2.default;
exports.ToggleCheckBox = _checkBox2.default;
exports.ToggleIndeterminateCheckBox = _indeterminateCheckBox2.default;
exports.ToggleRadioButtonChecked = _radioButtonChecked2.default;
exports.ToggleRadioButtonUnchecked = _radioButtonUnchecked2.default;
exports.ToggleStarBorder = _starBorder2.default;
exports.ToggleStarHalf = _starHalf2.default;
exports.ToggleStar = _star2.default;