package company.newlife;

import company.newlife.security.UrlAuthenSuccessHandler;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.http.CacheControl;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import org.springframework.web.servlet.resource.CssLinkResourceTransformer;
import org.springframework.web.servlet.resource.ResourceUrlEncodingFilter;
import org.springframework.web.servlet.resource.VersionResourceResolver;

import java.util.concurrent.TimeUnit;

@SpringBootApplication

public class NewlifeApplication extends WebSecurityConfigurerAdapter implements WebMvcConfigurer {

    @Autowired
    private UserDetailsService userDetailsService;

    @Autowired
    private UrlAuthenSuccessHandler urlAuthenSuccessHandler;

    public static void main(String[] args) {
        SpringApplication.run(NewlifeApplication.class, args);
    }

    @Bean
    public FilterRegistrationBean<ResourceUrlEncodingFilter> resourceUrlEncodingFilter() {
        FilterRegistrationBean<ResourceUrlEncodingFilter> registrationBean = new FilterRegistrationBean<>();
        registrationBean.setFilter(new ResourceUrlEncodingFilter());
        registrationBean.addUrlPatterns("/*");
        return registrationBean;
    }

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        registry.addResourceHandler("/**")
                .addResourceLocations("classpath:/static/")
                .setCacheControl(CacheControl.maxAge(365, TimeUnit.DAYS))
                .resourceChain(false)
                .addResolver(new VersionResourceResolver().addContentVersionStrategy("/**"))
                .addTransformer(new CssLinkResourceTransformer());
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder(12);
    }

    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.userDetailsService(userDetailsService).passwordEncoder(passwordEncoder());
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.csrf().disable();
        //request hop le
        http.authorizeRequests()
                .antMatchers("/login", "/logout", "/loginError", "/staticAdmin/**", "/staticClient/**","/api/admin/**","/v2/**","/swagger-ui.html").permitAll()
                .antMatchers("/admin/**").hasAnyRole("ADMIN")
                .and().exceptionHandling().accessDeniedPage("/access-denied-role");
        http.authorizeRequests().and()
                .formLogin()
                .loginPage("/login").loginProcessingUrl("/login")
                .usernameParameter("username").passwordParameter("password")
                .failureUrl("/loginError").successHandler(urlAuthenSuccessHandler)
                .and().logout().logoutUrl("/logout").logoutSuccessUrl("/dashboard")
                .deleteCookies("JSESSIONID").invalidateHttpSession(true);
    }

}
