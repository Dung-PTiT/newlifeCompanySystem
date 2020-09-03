package company.newlife.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

import javax.servlet.http.HttpServletRequest;

@Controller
public class LoginController {
    @GetMapping("/login")
    public String login() {
        return "login";
    }

    @GetMapping("/loginError")
    public String login(HttpServletRequest request, Model model) {
        String errorMessage = "Tên tài khoản hoặc mật khẩu không đúng";
        model.addAttribute("errorMessage", errorMessage);
        return "login";
    }

    @GetMapping("/access-denied-role")
    public String accessDeniedRole() {
        return "accessDeniedRole";
    }
}
