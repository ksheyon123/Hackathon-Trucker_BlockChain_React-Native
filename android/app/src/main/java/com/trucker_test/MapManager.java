package com.trucker_test;

import android.util.Log;

import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.uimanager.SimpleViewManager;
import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.annotations.ReactProp;


//Manager using MapView
public class MapManager extends SimpleViewManager<MapView> {

    @Override
    public String getName() {
        return "TMap";
    }

    @Override
    protected MapView createViewInstance(ThemedReactContext reactContext) {
        Log.d("create","creating Instance");
        MapView mapView = new MapView(reactContext);
        return mapView;
    }

    /* 지도 센터 설정 */
    @ReactProp(name="setCenter")
    public void setCenter(MapView mapView, ReadableArray coordinate) {
        Log.d("manage","called from mananger to set center");
        mapView.setMapCenter(coordinate);
    }

    /* 마커 추가 */
    @ReactProp(name="addMarker")
    public void addMarker(MapView mapView, ReadableArray orderList) {
        Log.d("manage","called from mananger:"+orderList.toString());
        mapView.addMarker(orderList);
    }

    /* 자동차 경로 찾기*/
    @ReactProp(name="addRoute")
    public void addRoute(MapView mapView, ReadableArray coordinates) {
        mapView.addRoute(coordinates);
    }

    /* 마커 생성 */
    @ReactProp(name="mark")
    public void markCoordinate(MapView mapView, ReadableArray coordinate) {
        mapView.markCoordinate(coordinate);
    }
}
