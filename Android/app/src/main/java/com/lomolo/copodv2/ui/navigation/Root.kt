package com.lomolo.copodv2.ui.navigation

import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.navigation.NavHostController
import androidx.navigation.compose.NavHost
import androidx.navigation.compose.composable
import com.lomolo.copodv2.ui.screens.DashboardScreen
import com.lomolo.copodv2.ui.screens.DashboardScreenDestination
import com.lomolo.copodv2.ui.screens.LoginScreen
import com.lomolo.copodv2.ui.screens.LoginScreenDestination

interface Navigation {
    val title: Int?
    val route: String
}

object RootNavigation: Navigation {
    override val title = null
    override val route = "root"
}

@Composable
fun NavigationHost(
    modifier: Modifier,
    navHostController: NavHostController
) {
    NavHost(
        navController = navHostController,
        startDestination = LoginScreenDestination.route,
        route = RootNavigation.route,
    ) {
        composable(route = LoginScreenDestination.route) {
            LoginScreen(modifier = modifier)
        }
        composable(route = DashboardScreenDestination.route) {
            DashboardScreen(modifier = modifier)
        }
    }
}