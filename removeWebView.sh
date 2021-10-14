#!/bin/bash
BASE_DIR=`pwd`;
function remove_rctwebview(){
    
    local dir="${BASE_DIR}/node_modules/react-native/React";

    rm -f "${dir}/Views/RCTWebView.m"
    rm -f "${dir}/Views/RCTWebView.h"
    rm -f "${dir}/Views/RCTWebViewManager.m"
    rm -f "${dir}/Views/RCTWebViewManager.h"
}

remove_rctwebview;