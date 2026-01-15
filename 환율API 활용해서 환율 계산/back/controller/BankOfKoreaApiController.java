package com.daou.go.integration.controller.api;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.daou.go.core.controller.api.ApiController;
import com.daou.go.core.controller.api.model.ResponseWrapper;
import com.daou.go.integration.service.BankOfKoreaApiService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
public class BankOfKoreaApiController extends ApiController {

    private final BankOfKoreaApiService bankOfKoreaApiService;

    @GetMapping("/bank/korea/statistic")
    public ResponseWrapper<String> getCoordinates(
            @RequestParam(value = "queryString", required = false) String queryString) { // size 는 최대30까지
        return buildResponse(bankOfKoreaApiService.getStatisticSearch(queryString));
    }

}
