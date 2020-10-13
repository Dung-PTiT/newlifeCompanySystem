package company.newlife.service;

import company.newlife.model.Message;
import company.newlife.util.paging.PagingRequest;
import company.newlife.util.paging.PagingResponse;

import java.util.List;

public interface MessageService {
    void create(Message message);

    Message get(Integer id);

    List<Message> getAll();

    PagingResponse<Message> fetch(PagingRequest request);

    void update(Message message);

    void delete(Integer id);
}
