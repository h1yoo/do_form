package com.daou.go.integration.service;

import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class BankOfKoreaApiServiceImpl implements BankOfKoreaApiService {

    // JS에서 직접호출시 서버까지 요청이 도달하지 못하고 브라우저에서 차단됨 -> CORS 차단 예상
    @Override
    public String getStatisticSearch(String queryString) {
        // TODO Auto-generated method stub
        String apiUrl = "https://ecos.bok.or.kr/api/StatisticSearch/SSQIDPZW9IQ1N0231X8S/json";
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        HttpEntity<String> entity = new HttpEntity<>(headers);
        RestTemplate restTemplate = new RestTemplate();
        ResponseEntity<String> responseEntity = restTemplate.exchange(apiUrl + queryString, HttpMethod.GET, entity, String.class);
        return responseEntity.getBody();
    }

}
