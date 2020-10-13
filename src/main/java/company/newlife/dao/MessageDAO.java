package company.newlife.dao;

import company.newlife.entity.MessageEntity;
import company.newlife.util.paging.PagingRequest;
import company.newlife.util.paging.PagingResponse;

import java.util.List;

public interface MessageDAO {
    void create(MessageEntity messageEntity);

    MessageEntity get(Integer id);

    List<MessageEntity> getAll();

    List<MessageEntity> fetch(PagingRequest request);

    void update(MessageEntity messageEntity);

    void delete(MessageEntity messageEntity);

    long count();
}
