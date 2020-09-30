package company.newlife.controller.client;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class AboutUsController {
    @GetMapping("/about")
    public String goToContactPage() {
        return "/client/about";
    }
}
