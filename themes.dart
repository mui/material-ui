import 'dart:math';

import 'package:flutter/material.dart';

import 'package:google_fonts/google_fonts.dart';

var colorList = [

  Colors.orange,

  Colors.blue,

  Colors.cyan,

  Colors.green,

  Colors.pink,

  Colors.red,

  Colors.brown,

  Colors.deepPurple,

  // Colors.grey,

];

bool isDarkMode = false;

class MyTheme {

  static ThemeData lightTheme(BuildContext context) => ThemeData(

        primarySwatch: colorList[Random().nextInt(colorList.length)],

        accentColor: Colors.white,

        // splashColor: Colors.transparent,

        fontFamily: GoogleFonts.poppins().fontFamily,

        canvasColor: Colors.white,

        // highlightColor: Colors.transparent,

        pageTransitionsTheme: PageTransitionsTheme(

          builders: {

            TargetPlatform.iOS: ZoomPageTransitionsBuilder(),

            TargetPlatform.android: OpenUpwardsPageTransitionsBuilder(),

            TargetPlatform.windows: OpenUpwardsPageTransitionsBuilder(),

          },

        ),

        appBarTheme: AppBarTheme(

            elevation: 2,

            iconTheme: IconThemeData(

              color: Colors.white,

            ),

            textTheme: Theme.of(context).textTheme),

      );

  static ThemeData darkTheme(BuildContext context) => ThemeData(

        primaryColor: Colors.black,

        brightness: Brightness.dark,

        fontFamily: GoogleFonts.poppins().fontFamily,

        bottomNavigationBarTheme:

            BottomNavigationBarThemeData(backgroundColor: Colors.black),

        textButtonTheme: TextButtonThemeData(),

        pageTransitionsTheme: PageTransitionsTheme(

          builders: {

            TargetPlatform.iOS: ZoomPageTransitionsBuilder(),

            TargetPlatform.android: OpenUpwardsPageTransitionsBuilder(),

            TargetPlatform.windows: OpenUpwardsPageTransitionsBuilder(),

          },

        ),

      );

}
