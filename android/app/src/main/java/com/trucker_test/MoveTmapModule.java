package com.trucker_test;

import android.util.Log;
import android.widget.Toast;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.modules.core.DeviceEventManagerModule;
import com.facebook.react.uimanager.IllegalViewOperationException;

import java.util.HashMap;
import java.util.Map;

import javax.annotation.Nullable;

import com.skt.Tmap.TMapTapi;

public class MoveTmapModule extends ReactContextBaseJavaModule {

    //private int count = 0;

    public MoveTmapModule(ReactApplicationContext reactApplicationContext) {
        super(reactApplicationContext);
    }

    @Override
    public String getName() {
        return "MoveTmap";
    }

    @Override
    public Map<String, Object> getConstants() {
        final Map<String, Object> constants = new HashMap<>();
        constants.put("initialCount", 0);
        return constants;
    }

    @ReactMethod
    private void moveTmapfromTrucker(String h) {
        Log.d("moveTmapfromTrucker run", h);
        //double _lat, double _long
        //Toast.makeToast(getReactApplicationContext(), message, duration).show();
        TMapTapi tmaptapi = new TMapTapi(getReactApplicationContext());
	    tmaptapi.setSKTMapAuthentication ("88bebbd6-8f99-4144-a656-46abd418bba8");

        boolean isTmapApp = tmaptapi.isTmapApplicationInstalled();

        if(isTmapApp) {
             HashMap pathInfo = new HashMap();
            pathInfo.put("rGoName", "출발지");
            pathInfo.put("rGoY", "37.50861147");
            pathInfo.put("rGoX", "126.8911457");

            pathInfo.put("rV1Name", "상차지");
            pathInfo.put("rV1X", "37.50861141");
            pathInfo.put("rV1Y", "126.8911451");

            pathInfo.put("rGoName", "하차지");
            pathInfo.put("rStX", "37.50861145");
            pathInfo.put("rStY", "126.8911455");

            tmaptapi.invokeRoute(pathInfo);
        } else {
            Toast.makeText(getReactApplicationContext(), "TMap을 실행시킬 수 없습니다.", Toast.LENGTH_SHORT).show();
        }

        //Toast.makeToast(getReactApplicationContext(), "No", Toast.LENGTH_SHORT).show();
    }
}