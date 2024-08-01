package com.trek.TaskTrek.config;

import com.fasterxml.jackson.databind.ser.std.ToStringSerializer;
import com.trek.TaskTrek.filter.JwtFilter;
import com.trek.TaskTrek.services.AdminServiceImplementation;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.jackson.Jackson2ObjectMapperBuilderCustomizer;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.annotation.Order;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;


@Configuration
@EnableWebSecurity
public class SpringSecurity{
    @Autowired
    private AdminServiceImplementation adminServiceImplementation;

    @Autowired
    private JwtFilter jwtFilter;

    @Bean
    @Order(1)
    public SecurityFilterChain oAuthSecurityFilterChain(HttpSecurity http) throws Exception{
        http.csrf(AbstractHttpConfigurer::disable).sessionManagement(httpSecuritySessionManagementConfigurer ->
                httpSecuritySessionManagementConfigurer.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                        .authorizeHttpRequests((requests ->requests.requestMatchers("/admin/**","/task/**","/team/**","/general/**")
                .permitAll())).authenticationProvider(authenticationProvider());
        http.addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class);
        return http.build();
    }

    @Bean
    @Order(2)
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception{
        http.csrf(AbstractHttpConfigurer::disable).sessionManagement(httpSecuritySessionManagementConfigurer ->
                        httpSecuritySessionManagementConfigurer.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .authorizeHttpRequests((requests ->requests.requestMatchers("/team/**","/task/**","/general/**")
                        .permitAll()
                        .anyRequest()
                        .authenticated()));
        return http.build();
    }

    @Bean
    public BCryptPasswordEncoder getPassWordEncoder() {
        return new BCryptPasswordEncoder(15);
    }

    @Bean
    public DaoAuthenticationProvider authenticationProvider() {
        DaoAuthenticationProvider authProvider = new DaoAuthenticationProvider();
        authProvider.setUserDetailsService(adminServiceImplementation);
        authProvider.setPasswordEncoder(getPassWordEncoder());
        return authProvider;
    }
    @Bean
    public static AuthenticationManager authenticationManagerBean(AuthenticationConfiguration auth) throws Exception {
        return auth.getAuthenticationManager();
    }
//    @Bean
//    public Jackson2ObjectMapperBuilderCustomizer customizer()
//    {
//        return builder -> builder.serializerByType(ObjectId.class,new ToStringSerializer());
//    }
}
