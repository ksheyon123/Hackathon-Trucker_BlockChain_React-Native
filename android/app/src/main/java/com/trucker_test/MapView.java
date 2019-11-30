package com.trucker_test;

import android.content.Context;
import android.util.Log;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.graphics.Color;
import android.graphics.DashPathEffect;
import java.util.ArrayList;
import java.util.List;

import com.facebook.react.bridge.ReadableArray;
import com.skt.Tmap.TMapData;
import com.skt.Tmap.TMapMarkerItem;
import com.skt.Tmap.TMapPoint;
import com.skt.Tmap.TMapPolyLine;
import com.skt.Tmap.TMapView;



public class MapView extends TMapView {

    private double centerLat=50.4000;//중심좌표 latitude
    private double centerLong=127.5000;//중심좌표 longtitude

    public void markCoordinate(ReadableArray coordinate)
    {
        Log.d("mark","called from mark:"+coordinate.getDouble(0)+", "+coordinate.getDouble(1) );
        TMapMarkerItem markerItem = new TMapMarkerItem();
        TMapPoint tMapPoint = new TMapPoint(coordinate.getDouble(0),coordinate.getDouble(1));
        
        Bitmap bitmap = BitmapFactory.decodeResource(getResources(), R.drawable.pin_r_m_a);
        markerItem.setIcon(bitmap);
        markerItem.setPosition(0.5f, 1.0f); // 마커의 중심점을 중앙, 하단으로 설정
        markerItem.setTMapPoint( tMapPoint ); // 마커의 좌표 지정
        markerItem.setName("Luggage"); // 마커의 타이틀 지정

        markerItem.setCalloutTitle("상차지");//풍선뷰에 표시될 메세지
        markerItem.setCanShowCallout(true); //풍선뷰 사용

        this.addMarkerItem("Luggage", markerItem); // 지도에 마커 추가
        this.setCenterPoint( coordinate.getDouble(1),coordinate.getDouble(0) );
    }

    public void setMapCenter(ReadableArray coordinate)
    {
        ArrayList<TMapPoint> alTMapPoint = new ArrayList<TMapPoint>();
        alTMapPoint.add( new TMapPoint(37.566269, 126.985065) ); // SKT타워
        alTMapPoint.add( new TMapPoint(37.551135, 126.988205) ); // N서울타워
        alTMapPoint.add( new TMapPoint(37.579600, 126.976998) ); // 경복궁

        // TMapPolyLine tMapPolyLine = new TMapPolyLine();
        // tMapPolyLine.setLineColor(R.color.colorAccent);
        // tMapPolyLine.setLineWidth(10);
        
        // for( int i=0; i<alTMapPoint.size(); i++ ) {
        //     tMapPolyLine.addLinePoint( alTMapPoint.get(i) );
        // }
        // this.addTMapPolyLine("Line1", tMapPolyLine);

        this.centerLat=coordinate.getDouble(0);
        this.centerLong=coordinate.getDouble(1);
        Log.d("setCenter","called from setMapCenter: "+this.centerLat);
        this.setCenterPoint(this.centerLat,this.centerLong);

    }
    
    public void addMarker(ReadableArray orderList)
    {
        /* 현재주소 마커 */
        TMapPoint tMapPointC = new TMapPoint(orderList.getMap(0).getDouble("currentLat"), orderList.getMap(0).getDouble("currentLong"));
        TMapMarkerItem markerItemC = new TMapMarkerItem();
        Bitmap bitmapC = BitmapFactory.decodeResource(getResources(), R.drawable.pin_r_m_c);
        markerItemC.setIcon(bitmapC);
        markerItemC.setPosition(0.5f, 1.0f); // 마커의 중심점을 중앙, 하단으로 설정
        markerItemC.setTMapPoint( tMapPointC ); // 마커의 좌표 지정
        markerItemC.setName("orderCurrent"); // 마커의 타이틀 지정
        markerItemC.setCalloutTitle(orderList.getMap(0).getString("currentAddr"));//풍선뷰에 표시될 메세지
        markerItemC.setCanShowCallout(true); //풍선뷰 사용
        this.addMarkerItem("orderCurrent", markerItemC); // 지도에 마커 추가

        /* 상차지 주소 마커 */
        TMapPoint tMapPointU = new TMapPoint(orderList.getMap(0).getDouble("upLat"), orderList.getMap(0).getDouble("upLong"));
        TMapMarkerItem markerItemU = new TMapMarkerItem();
        Bitmap bitmapU = BitmapFactory.decodeResource(getResources(), R.drawable.pin_r_m_u);
        markerItemU.setIcon(bitmapU);
        markerItemU.setPosition(0.5f, 1.0f); // 마커의 중심점을 중앙, 하단으로 설정
        markerItemU.setTMapPoint( tMapPointU ); // 마커의 좌표 지정
        markerItemU.setName("orderUp"); // 마커의 타이틀 지정
        markerItemU.setCalloutTitle(orderList.getMap(0).getString("upAddr"));//풍선뷰에 표시될 메세지
        markerItemU.setCanShowCallout(true); //풍선뷰 사용
        this.addMarkerItem("orderUp", markerItemU); // 지도에 마커 추가

        /* 하차지 주소 마커 */
        TMapPoint tMapPointD = new TMapPoint(orderList.getMap(0).getDouble("downLat"), orderList.getMap(0).getDouble("downLong"));
        TMapMarkerItem markerItemD = new TMapMarkerItem();
        Bitmap bitmapD = BitmapFactory.decodeResource(getResources(), R.drawable.pin_r_m_d);
        markerItemD.setIcon(bitmapD);
        markerItemD.setPosition(0.5f, 1.0f); // 마커의 중심점을 중앙, 하단으로 설정
        markerItemD.setTMapPoint( tMapPointD ); // 마커의 좌표 지정
        markerItemD.setName("orderDown"); // 마커의 타이틀 지정
        markerItemD.setCalloutTitle(orderList.getMap(0).getString("downAddr"));//풍선뷰에 표시될 메세지
        markerItemD.setCanShowCallout(true); //풍선뷰 사용
        this.addMarkerItem("orderDown", markerItemD); // 지도에 마커 추가

        addRoute(orderList);
    }

    /* 현재위치->상차지->하차지 경로 설정 */
    public void addRoute(ReadableArray coordinates)
    {
        final TMapView tMapView=this;
        TMapData tmapdata = new TMapData();
        Log.d("addRoute","addRoute initiated");

        TMapPoint tMapCurrentPoint = new TMapPoint(coordinates.getMap(0).getDouble("currentLat"), coordinates.getMap(0).getDouble("currentLong"));  //현재 주소
        ArrayList<TMapPoint> tMapUpPoint = new ArrayList<TMapPoint>();
        tMapUpPoint.add(new TMapPoint(coordinates.getMap(0).getDouble("upLat"), coordinates.getMap(0).getDouble("upLong")));   //상차지
        TMapPoint tMapDownPoint = new TMapPoint(coordinates.getMap(0).getDouble("downLong"), coordinates.getMap(0).getDouble("downLat")); //하차지

        tmapdata.findPathDataWithType(TMapData.TMapPathType.CAR_PATH, tMapCurrentPoint, tMapDownPoint, tMapUpPoint, 0, new TMapData.FindPathDataListenerCallback() {
            @Override
            public void onFindPathData(TMapPolyLine polyLine) {
                polyLine.setLineColor(Color.BLUE);
                polyLine.setLineWidth(2);
                tMapView.addTMapPolyLine("Line1", polyLine);
            }
        });

        /* 경로에 맞게 센터 표시 */
        tMapView.setCenterPoint(coordinates.getMap(0).getDouble("currentLong"), coordinates.getMap(0).getDouble("currentLat"));

        // /* 마커 띄우기 */
        // addMarker(orderList);
    }
    public MapView(Context context) {
        super(context);
        this.setSKTMapApiKey("88bebbd6-8f99-4144-a656-46abd418bba8");
        Log.d("construct","called from constructor: "+this.centerLat);
        this.setZoom(12);
        this.setCenterPoint(this.centerLat,this.centerLong);
    }

}

